# Arquitectura: front administrativo Conexión POS

`administrative-cnx-pos` es el panel web con el que el equipo de Conexión POS administra usuarios internos y clientes. Desde aquí se registran los clientes, se aprovisiona su esquema en la base del POS, se configuran sus credenciales de facturación electrónica (Taxxa), sus licencias y su acceso a las herramientas web (`web-reporter-v2`). Todo lo hace a través de la API `administrative-api-cxpos`.

| Aspecto | Valor |
| --- | --- |
| Framework | Vue 3 (`<script setup>` + TypeScript) sobre Vite 6 |
| UI | Vuetify 3 (iconos MDI, idioma español), SweetAlert2, Notiflix, Lottie |
| Estado | Pinia; sesión y borrador de cliente persistidos con `useStorage` (`@vueuse/core`) |
| Navegación | Vue Router 4 con guard global |
| HTTP | axios envuelto en `src/utils/http/http.ts` |
| Validación | Yup y reglas propias en `modules/clients/validations/` |
| Puerto de desarrollo | 5173 (`npx vite`) |
| Backend | `administrative-api-cxpos` (puerto 3620) |

## 1. Vista general

```mermaid
%% ==================== ARQUITECTURA DEL FRONT ADMINISTRATIVO ====================
%% Proyecto: administrative-cnx-pos (Vue 3 + Vite + Vuetify + Pinia)
%% Capas: Vista (página) → Componentes → Store (Pinia) → Servicio → Cliente HTTP (axios) → API administrativa

flowchart TB

    USER(["Usuario administrativo<br/>navegador"])

    subgraph FRONT["administrative-cnx-pos (Vite, puerto 5173)"]
        direction TB

        subgraph BOOT["1. Arranque"]
            MAIN["main.ts<br/>Vuetify (es, MDI), Pinia, router, Lottie<br/>componentes globales Layout y Paginator"]
            APP["App.vue<br/>router-view + pantallas de carga<br/>provee SweetAlert2 como 'swal'"]
        end

        subgraph NAV["2. Navegación"]
            ROUTER["router/index.ts<br/>rutas de auth, users, clients, permissions"]
            GUARD["beforeEach<br/>sin token → /login<br/>permisos por módulo si VITE_ENABLE_PERMISSIONS"]
            LAYOUT["Layouts/LayoutOne.vue<br/>barra superior, menú lateral, cerrar sesión"]
        end

        subgraph VIEWS["3. Vistas y componentes por módulo"]
            V_AUTH["auth/<br/>PageLogin, LoginForm"]
            V_USERS["users/<br/>UsersIndex, UsersForm, UsersEdit, UsersTable"]
            V_CLI["clients/<br/>ClientsMain, ClientsMainForm,<br/>ClientsDetails, ClientsDetailsWebUtilities,<br/>PermissionsList"]
            V_PERM["permissions/<br/>PermissionsIndex (datos de ejemplo)"]
            V_SHARED["components/<br/>Paginator, LocationsComponent,<br/>LoadingScreen, NotFound"]
        end

        subgraph STATE["4. Estado (Pinia)"]
            S_AUTH["auth<br/>token y usuario en localStorage 'auth'"]
            S_APP["app-store<br/>pantalla de carga"]
            S_USERS["users-store"]
            S_CLI["clients<br/>borrador del formulario en localStorage 'form'"]
            S_LOC["locations-component-store"]
        end

        subgraph DATA["5. Acceso a la API"]
            SVC["modules/*/services/*.ts<br/>arman URL + Authorization: Bearer"]
            URL["utils/http/get-api-url.ts<br/>DEV: VITE_NEST_API_URL<br/>PROD: VITE_QA_API_URL"]
            HTTP["utils/http/http.ts<br/>axios; errores → { status, data }"]
            NOTIF["http-notifications<br/>avisos Notiflix 401 / 403 / 409"]
        end
    end

    API["administrative-api-cxpos<br/>/auth, /users, /clients,<br/>/licenses, /conxpos-utilities"]
    LS[("localStorage<br/>auth, permissions, form")]

    USER --> MAIN --> APP --> ROUTER
    ROUTER --> GUARD
    GUARD -->|"lee token"| S_AUTH
    ROUTER --> V_AUTH & V_USERS & V_CLI & V_PERM
    V_USERS & V_CLI & V_PERM --> LAYOUT
    V_CLI --> V_SHARED
    V_USERS --> V_SHARED
    V_AUTH --> S_AUTH
    V_USERS --> S_USERS
    V_CLI --> S_CLI
    V_SHARED --> S_LOC
    V_USERS & V_CLI --> S_APP
    S_AUTH & S_USERS & S_CLI & S_LOC --> SVC
    SVC --> URL
    SVC --> HTTP
    HTTP -->|"HTTP JSON"| API
    HTTP -.->|"error"| NOTIF
    S_AUTH <--> LS
    S_CLI <--> LS
```

Fuente del diagrama: [arquitectura.mmd](arquitectura.mmd).

## 2. Capas y responsabilidades

| Capa | Ubicación | Responsabilidad |
| --- | --- | --- |
| Arranque | `src/main.ts`, `src/App.vue` | Registra Vuetify, Pinia, router, Lottie y los componentes globales `Layout` y `Paginator`; provee SweetAlert2 como `swal`. |
| Navegación | `src/router/` | Une las rutas de cada módulo y protege la navegación. |
| Layout | `src/Layouts/LayoutOne.vue` | Barra superior, menú lateral y cierre de sesión. |
| Vistas | `src/modules/<módulo>/page/` y componentes enrutados | Pantallas asociadas a una ruta. |
| Componentes | `src/modules/<módulo>/components/`, `src/components/` | Formularios, tablas, tarjetas y piezas reutilizables. |
| Estado | `src/modules/<módulo>/store(s)/`, `src/stores/` | Datos de pantalla, paginación, filtros y llamadas a servicios. |
| Servicios | `src/modules/<módulo>/services/` | Construyen la URL de la API y el encabezado `Authorization`. |
| HTTP | `src/utils/http/` | URL base por ambiente, query string, axios y notificaciones de error. |

### Configuración de la API

`src/utils/http/get-api-url.ts` elige la URL base:

| Modo | Variable |
| --- | --- |
| Desarrollo (`vite`) | `VITE_NEST_API_URL` |
| Build de producción (`vite build`) | `VITE_QA_API_URL` |

`VITE_ENABLE_PERMISSIONS=true` activa la validación de acceso por módulo en el router. El archivo `.env` local apunta a `http://localhost:3620` con permisos desactivados.

### Cliente HTTP y errores

`Http.get/post/put/patch/delete` nunca lanzan excepción ante una respuesta de error: devuelven `{ status, data }` y, salvo que se indique `showHttpError: false`, muestran un aviso Notiflix para 401, 403 y 409. Por eso los stores comparan `response.status` en lugar de usar `try/catch`.

### Sesión

- `authStore.login` guarda en `localStorage` (`auth`) el token, `isLogged`, el nombre de usuario y `exp`, decodificados del JWT.
- El guard redirige a `/login` si no hay token y envía `/` a `/login`.
- Los servicios toman el token del store de auth al cargarse el módulo.
- `authStore.authCheck` compara `exp` con segundos, pero la API lo emite en milisegundos, así que la sesión nunca se considera vencida en el front.

## 3. Flujo de datos

```mermaid
%% ==================== FLUJO DE DATOS DEL FRONT ADMINISTRATIVO ====================
%% Proyecto: administrative-cnx-pos
%% Recorridos: 1) inicio de sesión, 2) navegación protegida y carga de una lista,
%% 3) detalle de un cliente (varias llamadas en paralelo a la API).

sequenceDiagram
    autonumber
    actor U as Usuario
    participant V as Vista / componente
    participant R as Router (beforeEach)
    participant ST as Store Pinia
    participant SV as Servicio del módulo
    participant H as Http (axios)
    participant LS as localStorage
    participant API as API administrativa

    %% -------------------- 1. INICIO DE SESIÓN --------------------
    rect rgba(120, 160, 220, 0.12)
    Note over U,API: 1. Login (/login)
    U->>V: usuario y contraseña en LoginForm
    V->>ST: authStore.login({ user, password })
    ST->>SV: loginService.logIn
    SV->>H: post(URL/auth/login)
    H->>API: POST /auth/login
    API-->>H: 200 { response: { token } } o 401
    H-->>ST: respuesta (los errores no lanzan excepción)
    ST->>ST: jwtDecode → username, exp
    ST->>LS: guarda 'auth' { token, isLogged, typeUser, exp }
    ST-->>V: { isLogged }
    V->>R: router.push(Home)
    end

    %% -------------------- 2. NAVEGACIÓN PROTEGIDA --------------------
    rect rgba(120, 200, 140, 0.12)
    Note over U,API: 2. Abrir /client/list
    U->>R: navegar a /client/list
    R->>ST: ¿hay token en authStore?
    alt sin token
        R-->>U: redirige a /login
    else con token
        R->>V: monta ClientsMain
        V->>ST: appStore.afterLoading(clientsStore.loadPaginatedList)
        ST->>SV: ClientsService.getPaginateClients(page, limit, search, ...)
        SV->>H: get(URL/clients/find/pagination, Bearer)
        H->>API: GET con Authorization
        API-->>H: 200 { response: { list, count, totalPages } }
        H-->>ST: datos
        ST-->>V: list, itemsCount, totalPages (reactivos)
        V-->>U: tabla + Paginator
    end
    end

    %% -------------------- 3. DETALLE DE CLIENTE --------------------
    rect rgba(230, 170, 90, 0.12)
    Note over U,API: 3. Abrir /client/:id/details
    U->>V: ClientsDetails (onMounted)
    V->>ST: loadTenantDetails, getLicense, loadElectronicInvoiceProviders,<br/>loadClient, setDatabaseWebUtilities, getLicenseWebUtilities
    ST->>H: GET /clients/:id/tenant-info
    ST->>H: GET /licenses/find-last/:tenant_id
    ST->>H: GET /clients/find-all/electronic-invoice-providers
    ST->>H: GET /clients/:id
    ST->>H: GET /conxpos-utilities/database/:id
    ST->>H: GET /conxpos-utilities/find-last/:database_id
    H->>API: peticiones con Bearer
    API-->>H: datos o 400 cuando el id es undefined
    H-->>U: notificación si hubo 401 / 403 / 409
    ST-->>V: pestañas Facturación electrónica y Herramientas web
    end
```

Fuente del diagrama: [flujo-datos.mmd](flujo-datos.mmd).

### Patrón de una pantalla

1. La vista se monta y llama a una acción del store, normalmente envuelta en `appStore.afterLoading()` para mostrar la pantalla de carga.
2. La acción del store llama al servicio del módulo, que arma la URL con `getApiUrl()` y el `Authorization: Bearer`.
3. `Http` ejecuta la petición con axios y devuelve la respuesta (o `{ status, data }` si hubo error).
4. El store guarda `response.data.response` en su estado (`list`, `itemsCount`, `totalPages`, `selectedItem`...) y la vista se actualiza por reactividad.
5. Los componentes hijos se comunican con eventos `{ name, data }` (`EmitInterface`) y el `Paginator` global emite `onChangePage`.

### Formulario de cliente

El formulario vive en `clientsStore.form`, persistido en `localStorage` (`form`). Si el usuario sale sin guardar, `ClientsMainForm` detecta el borrador al volver. Cada sección se valida por separado (principal, fiscal, ubicación, contacto, actividades) antes de enviar `POST /clients` o `PUT /clients/:id`.

## 4. Estructura del proyecto

```mermaid
%% ==================== ESTRUCTURA DEL PROYECTO ====================
%% Proyecto: administrative-cnx-pos
%% Carpetas principales y su responsabilidad. Cada módulo de src/modules sigue el patrón:
%% page/ (vista de ruta) → components/ → store(s)/ (Pinia) → services/ (API) → interfaces/ → route(s)/

flowchart LR
    ROOT["administrative-cnx-pos/"]

    %% ==================== RAÍZ ====================
    ROOT --> SRC["src/"]
    ROOT --> GEN["generator/<br/>generate.js + plantillas basic-crud<br/>(npm run generate)"]
    ROOT --> PUB["public/<br/>recursos estáticos"]
    ROOT --> DOCS["docs/<br/>documentación y diagramas"]
    ROOT --> CFG["vite.config.ts, tsconfig*.json,<br/>package.json, .env"]

    %% ==================== SRC ====================
    SRC --> MAIN["main.ts · App.vue · style.css"]
    SRC --> ROUTER["router/<br/>index.ts (guard), helpers.ts,<br/>aditional-routes.ts"]
    SRC --> LAYOUT["Layouts/<br/>LayoutOne.vue"]
    SRC --> STORES["stores/<br/>app-store.ts"]
    SRC --> COMP["components/<br/>Paginator, BigButton, HelloWorld (inicio),<br/>LoadingScreen, SplashScreen, NotFound,<br/>location-component/"]
    SRC --> UTILS["utils/<br/>http/ (axios, URL, notificaciones),<br/>date/, app-helpers/"]
    SRC --> IFACES["interfaces/<br/>tipos compartidos (persona, identificación,<br/>correo, teléfono, eventos)"]
    SRC --> ASSETS["assets/<br/>imágenes y animaciones Lottie"]
    SRC --> MODS["modules/"]

    %% ==================== MÓDULOS ====================
    MODS --> M_AUTH["auth/<br/>page, form, components,<br/>store (useStoreAuth), services, routes"]
    MODS --> M_USERS["users/<br/>page, components, stores,<br/>services, interfaces, routes"]
    MODS --> M_CLI["clients/"]
    MODS --> M_PERM["permissions/<br/>maqueta con datos de ejemplo"]
    MODS --> M_LOC["locations/<br/>servicio y selectores de ubicación<br/>(ruta propia no registrada)"]

    M_CLI --> C_PAGE["page/ClientsMain.vue"]
    M_CLI --> C_COMP["components/<br/>ClientTable, ClientsMainForm, ClientsDetails,<br/>ClientsDetailsWebUtilities, PermissionsList,<br/>ClientCommercialActivities, SyncThirdPartiesContact"]
    M_CLI --> C_FORMS["components/forms/<br/>FormMainInfo, FormFiscalInfo, FormAddressInfo,<br/>FormContactInfo, TaxxaForm, EIPSelector, resúmenes"]
    M_CLI --> C_STORE["store/useClientsStore.ts"]
    M_CLI --> C_SVC["services/clients.service.ts"]
    M_CLI --> C_VAL["validations/<br/>esquemas Yup y reglas adicionales"]
    M_CLI --> C_UTIL["utils/<br/>parse-clients-to-form, parse-location"]
    M_CLI --> C_ROUTE["route/router.ts"]
```

Fuente del diagrama: [estructura.mmd](estructura.mmd).

## 5. Generador de módulos

`npm run generate` ejecuta `generator/generate.js`: pide un nombre en PascalCase y copia las plantillas de `generator/basic-crud` (page, components, store, services, routes, interfaces) a `src/modules/<nombre-kebab-case>`. Los módulos `permissions` y `locations` conservan partes de esa plantilla sin adaptar.

## 6. Observaciones técnicas

Detectadas al leer el código y al probar el front contra la API local; no se corrigieron en esta documentación.

| Tema | Detalle |
| --- | --- |
| Llamadas con `undefined` | En `/client/:id/details`, si el cliente no tiene tenant o base web se llama a `/licenses/find-last/undefined` y `/conxpos-utilities/find-last/undefined`; la API responde 400. |
| Permisos | `/permissions/list` muestra datos fijos definidos en `PermissionsTable.vue`; el servicio de permisos apunta a rutas que la API no publica. |
| Vencimiento de sesión | `exp` se compara en segundos contra un valor en milisegundos. |
| Token en servicios | Los servicios leen el token del store al importarse; tras un login sin recargar la página dependen de que el objeto de sesión se actualice en el mismo store. |
| Login | Presionar Enter no envía el formulario; solo el botón. |
| Módulo locations | `LocationsRouter` no está registrado en el router y `LocationsIndex` llama acciones que el store no implementa. |
| Token en `localStorage` | Accesible desde JavaScript; relevante ante XSS. |

## 7. Documentos relacionados

- [MODULOS.md](MODULOS.md): rutas, componentes, stores y endpoints de cada módulo.
- [README.md](README.md): índice de la carpeta y cómo ejecutar el proyecto.
- Documentación de la API: `administrative-api-cxpos/docs/`.
