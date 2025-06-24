export const __name__(pascalCase)Router = [
  {
    path: "/__name__(kebabCase)/list",
    name: "__name__(kebabCase)-list",
    isAuth: false,
    //@ts-ignore
    component: () => import("../page/__name__(pascalCase)Index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/__name__(kebabCase)/table",
    name: "__name__(kebabCase)-table",
    isAuth: false,
    //@ts-ignore
    component: () => import("../components/__name__(pascalCase)Table.vue"),
    meta: { requiresAuth: true },
  },
];
