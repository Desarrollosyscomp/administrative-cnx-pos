export const ClientsRouter = [
  {
    path: "/client/list",
    name: "client-list",
    //component: () => import('../../auth/page/PageLogin.vue'),
    component: () => import("../page/ClientsMain.vue"),
  },
  {
    path: "/client/form",
    name: "client-form",
    isAuth: false,
    //@ts-ignore
    component: () => import("../components/ClientsMainForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/client/form/:id",
    name: "client-form-edit",
    isAuth: false,
    //@ts-ignore
    component: () => import("../components/ClientsMainForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/client/:id/permissions",
    name: "client-permissions",
    isAuth: false,
    //@ts-ignore
    component: () => import("../components/PermissionsList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/client/:id/details",
    name: "client-details",
    isAuth: false,
    //@ts-ignore
    component: () => import("../components/ClientsDetails.vue"),
    meta: { requiresAuth: true },
  },
];
