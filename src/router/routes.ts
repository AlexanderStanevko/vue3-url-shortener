import { RouteRecordRaw } from 'vue-router';
import auth from 'router/middleware/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('app/src/pages/MainPage.vue') },
      {
        path: '/create',
        name: 'CreateAccount',
        component: () => import('app/src/pages/CreateAccount.vue'),
      },
      {
        path: '/account',
        name: 'Account',
        component: () => import('app/src/pages/AccountPage.vue'),
        meta: {
          middleware: [auth],
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
