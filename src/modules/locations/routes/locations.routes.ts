export const LocationsRouter = [
  {
    path: "/locations/add",
    name: "locations-add",
    isAuth: false,
    //@ts-ignore
    component: () => import("../page/LocationsIndex.vue"),
    meta: { requiresAuth: true },
  },
];
