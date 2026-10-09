# Documentación: administrative-cnx-pos

Índice de la documentación del front administrativo de Conexión POS.

| Documento | Contenido |
| --- | --- |
| [ARQUITECTURA.md](ARQUITECTURA.md) | Capas, configuración de la API, sesión, flujo de datos, estructura y observaciones técnicas. |
| [MODULOS.md](MODULOS.md) | Rutas, vistas, stores y endpoints de cada módulo. |

## Diagramas (Mermaid)

Los archivos `.mmd` son la fuente de los diagramas; los `.md` los incluyen en bloques `mermaid` para leerlos directamente en GitHub, GitLab o VS Code.

| Archivo | Tipo | Muestra |
| --- | --- | --- |
| [arquitectura.mmd](arquitectura.mmd) | flowchart | Capas del front y su relación con la API y `localStorage`. |
| [flujo-datos.mmd](flujo-datos.mmd) | sequenceDiagram | Login, navegación protegida y carga del detalle de un cliente. |
| [funciones.mmd](funciones.mmd) | flowchart | Cada ruta con sus acciones de store y endpoints. |
| [estructura.mmd](estructura.mmd) | flowchart | Carpetas del proyecto y patrón de cada módulo. |

Si se modifica un `.mmd`, hay que actualizar el bloque equivalente en los `.md` que lo incluyen.

## Ejecutar en local

1. Crear `.env` en la raíz del proyecto:

   ```
   VITE_NEST_API_URL='http://localhost:3620'
   VITE_QA_API_URL='http://localhost:3620'
   VITE_ENABLE_PERMISSIONS=false
   ```

2. Instalar dependencias y arrancar:

   ```bash
   npm install
   ```

   ```bash
   npx vite --port 5173
   ```

   `npm run dev` ejecuta además `vue-tsc -b` antes de levantar Vite.

3. Abrir `http://localhost:5173/login` con la API administrativa en marcha.

## Comentarios en el código

Cada archivo de `src/` y `generator/generate.js` empieza con una cabecera que resume su propósito. En los `.vue` la cabecera está dentro del bloque `<script>`; los componentes sin script la llevan como comentario HTML al inicio:

```ts
// ==================== STORE: clients ====================
// Estado central del módulo: listado y filtros, formulario de cliente ...
```

Las funciones y acciones relevantes llevan una línea descriptiva encima:

```ts
// -------------------- Crea el esquema/tenant del cliente en el POS --------------------
```

Las plantillas de `generator/basic-crud` no se comentaron, porque su contenido se copia tal cual a los módulos generados.

## Proyecto relacionado

La API que consume este front es `administrative-api-cxpos`; su documentación está en `administrative-api-cxpos/docs/`.
