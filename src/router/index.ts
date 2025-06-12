import { createRouter, createWebHistory } from "vue-router";

import HelloWorld from "../components/HelloWorld.vue";
import PageLogin from "../modules/auth/page/PageLogin.vue";

import { CustomersRouter } from "../modules/customers/routes/customers.routes";
import { LogInRoute } from "../modules/auth/routes/router";
import { ProductsRouter } from "../modules/products/routes/products.routes";
import { UsersRouter } from "../modules/users/routes/users.routes";
import { ClientsRouter } from "../modules/clients/route/router";
import NotFound from "../components/NotFound.vue";
import { useAuthStore } from "../modules/auth/store/useStoreAuth";
import { verifyRouteAccess } from "./helpers";
import { PermissionsRouter } from "../modules/permissions/routes/permissions.routes";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
  },
  {
    path: "/login",
    name: "Login",
    component: PageLogin,
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    ...CustomersRouter,
    ...LogInRoute,
    ...ProductsRouter,
    ...UsersRouter,
    ...ClientsRouter,
    ...PermissionsRouter,
  ],
});

router.beforeEach((to, from, next) => {
  from;
  const authStore = useAuthStore();
  const toPathSegments = to.path.split("/");
  let { redirect } = verifyRouteAccess(authStore, toPathSegments);

  const enablePermissions = import.meta.env.VITE_ENABLE_PERMISSIONS === "true";

  if (!enablePermissions){
    next();
    return;
  }
  
  if (redirect == "next") {
    next();
    return;
  }
  if (redirect == "out") {
    next("/login");
    return;
  }
  if (redirect == "forbidden") {
    next("/unauthorized");
    return;
  }
});

export default router;
