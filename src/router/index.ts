import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from "../components/HelloWorld.vue";
import Layout from "../components/Layout.vue";
import { ProductsRouter } from '../modules/products/routes/products.routes';


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
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    ...ProductsRouter
  ],
});

export default router;
 