export const CustomersRouter = [
  {
    path: "/customers/list",
    name: "customers-list",
    isAuth: false,
    //@ts-ignore
    component: () => import("../page/CustomersIndex.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/customers/form",
    name: "customers-form",
    isAuth: false,
    //@ts-ignore
    component: () => import("../components/CustomersForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/customers/table",
    name: "customers-table",
    isAuth: false,
    //@ts-ignore
    component: () => import("../components/CustomersTable.vue"),
    meta: { requiresAuth: true },
  },
];
