import { RouteLocationRaw, NavigationGuardNext } from 'vue-router';
import { useUserStore } from 'stores/UserStore';
interface MiddlewareContext {
  next: NavigationGuardNext;
  nextMiddleware: () => void;
}

export default ({ next, nextMiddleware }: MiddlewareContext) => {
  const userStore = useUserStore();

  if (userStore.isLoggedIn) {
    return next({
      name: 'Account',
    } as RouteLocationRaw);
  }

  nextMiddleware();
};
