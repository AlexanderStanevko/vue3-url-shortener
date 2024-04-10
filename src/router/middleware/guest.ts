import { useUserStore } from 'stores/UserStore'

export default ({ next, nextMiddleware }) => {
  const userStore = useUserStore()

  if (userStore.isLoggedIn) {
    return next({
      name: 'IndexPage',
    })
  }

  nextMiddleware()
}
