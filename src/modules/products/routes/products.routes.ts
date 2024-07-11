export const ProductsRouter = [
  {
    path: "/products/list",
    name: "products-list",
    isAuth: false,
    //@ts-ignore
    component: () => import("../page/ProductsIndex.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/products/table",
    name: "products-table",
    isAuth: false,
    //@ts-ignore
    component: () => import("../components/ProductsTable.vue"),
    meta: { requiresAuth: true },
  },
];
