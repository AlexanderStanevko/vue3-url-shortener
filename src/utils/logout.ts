import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/UserStore'

export const useLogout = () => {
  const router = useRouter()
  const userStore = useUserStore()

  return () => {
    router.push({ path: '/' })
    userStore.logout()
  }
}
