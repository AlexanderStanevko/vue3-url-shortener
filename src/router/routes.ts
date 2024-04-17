import { RouteRecordRaw } from 'vue-router';
// import guest from 'router/middleware/guest';
import auth from 'router/middleware/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'Main',
        component: () => import('app/src/pages/MainPage.vue'),
      },
      {
        path: 'create',
        name: 'CreateAccount',
        component: () => import('app/src/pages/CreateAccount.vue'),
      },
      {
        path: 'login',
        name: 'LoginPage',
        component: () => import('app/src/pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'account',
        name: 'Account',
        component: () => import('app/src/pages/AccountPage.vue'),
        meta: {
          middleware: [auth],
        },
      },
      {
        path: 'links',
        name: 'Links',
        component: () => import('app/src/pages/LinksPage.vue'),
        meta: {
          middleware: [auth],
        },
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('app/src/pages/DashboardPage.vue'),
        meta: {
          middleware: [auth],
        },
      },
    ],
  },
  // Always leave this as the last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
