export const PermissionsRouter = [
  {
    path: "/permissions/list",
    name: "permissions-list",
    isAuth: false,
    //@ts-ignore
    component: () => import("../page/PermissionsIndex.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/permissions/table",
    name: "permissions-table",
    isAuth: false,
    //@ts-ignore
    component: () => import("../components/PermissionsTable.vue"),
    meta: { requiresAuth: true },
  },
];
