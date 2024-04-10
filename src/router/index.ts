import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
  Router,
  RouteLocationNormalized,
  NavigationGuardNext,
  RouterHistory,
} from 'vue-router';
import routes from 'router/routes';

export interface MiddlewareContext {
  from: RouteLocationNormalized;
  next: NavigationGuardNext;
  router: Router;
  to: RouteLocationNormalized;
  nextMiddleware?: () => void;
}

type Middleware = (context: MiddlewareContext) => void;

export default route((): Router => {
  const createWebHistoryFn: (base?: string) => RouterHistory =
    process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;
  const createHistory: (base?: string) => RouterHistory = process.env.SERVER
    ? createMemoryHistory
    : createWebHistoryFn;

  const Router: Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: routes as RouteRecordRaw[],
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  const nextFactory = (
    context: MiddlewareContext,
    middleware: Middleware[],
    index: number
  ): (() => void) => {
    const subsequentMiddleware: Middleware = middleware[index];
    if (!subsequentMiddleware) return context.next;
    return (): void => {
      const nextMiddleware: () => void = nextFactory(
        context,
        middleware,
        index + 1
      );
      subsequentMiddleware({ ...context, nextMiddleware });
    };
  };

  Router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
      const middleware: Middleware[] = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];
      const context: MiddlewareContext = { from, next, router: Router, to };
      const nextMiddleware: () => void = nextFactory(context, middleware, 1);
      return middleware[0]({ ...context, nextMiddleware });
    }
    return next();
  });

  return Router;
});
