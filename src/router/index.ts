import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home/Home.vue';
import TimeLine from '../views/TimeLine/TimeLine.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/time',
    name: 'TimeLine',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: TimeLine,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
