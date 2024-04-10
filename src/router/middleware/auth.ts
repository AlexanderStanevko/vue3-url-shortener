import { useUserStore } from 'stores/UserStore'

export default ({ to, next, nextMiddleware }) => {
  const userStore = useUserStore()

  if (!userStore.isLoggedIn) {
    return next({
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    })
  }

  nextMiddleware()
}
