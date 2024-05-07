import { useRouter } from 'vue-router';
import { useUrlShortenerStore } from 'stores/UrlShortenerStore';
import { useUserStore } from 'stores/UserStore';

export const useLogout = () => {
  const router = useRouter();
  const userStore = useUserStore();
  const urlStore = useUrlShortenerStore();

  return () => {
    router.push({ path: '/' });
    urlStore.clear();
    userStore.logout();
  };
};
