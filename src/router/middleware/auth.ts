import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useUserStore } from 'stores/UserStore';

interface MiddlewareContext {
  to: RouteLocationNormalized;
  next: NavigationGuardNext;
  nextMiddleware: () => void;
}

export default ({ to, next, nextMiddleware }: MiddlewareContext): void => {
  const userStore = useUserStore();

  if (!userStore.isLoggedIn) {
    return next({
      name: '',
    });
  }

  nextMiddleware();
};
