import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from "../components/HelloWorld.vue";
import Layout from "../components/Layout.vue";
import PageLogin from '../modules/auth/page/PageLogin.vue';

import { ProductsRouter } from '../modules/products/routes/products.routes';
import { LogInRoute } from "../modules/auth/route/router";
import { UsersRouter } from '../modules/users/routes/users.routes';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld,
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
  },
  {
    path: '/login',
    name: 'Login',
    component: PageLogin,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    ...ProductsRouter,
    ...LogInRoute,
    ...UsersRouter
  ],
});

export default router;
 