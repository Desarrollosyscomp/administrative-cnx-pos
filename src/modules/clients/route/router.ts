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
    name: "client-form",
    isAuth: false,
    //@ts-ignore
    component: () => import("../components/ClientsMainForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/client/permissions",
    name: "client-permissions",
    isAuth: false,
    //@ts-ignore
    component: () => import("../components/PermissionsList.vue"),
    meta: { requiresAuth: true },
  },
];
