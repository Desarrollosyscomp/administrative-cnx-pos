export const UsersRouter = [
  {
    path: "/users/list",
    name: "users-list",
    isAuth: false,
    //@ts-ignore
    component: () => import("../page/UsersIndex.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/users/table",
    name: "users-table",
    isAuth: false,
    //@ts-ignore
    component: () => import("../components/UsersTable.vue"),
    meta: { requiresAuth: true },
  },
];
