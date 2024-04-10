import { defineStore } from 'pinia'
import {
    User
} from 'types'


type UserState = User & {
  isLoading: boolean;
  token: string;
}

export const useUserStore = defineStore({
  id: 'UserStore',

  state: () => ({
    name: '',
    isLoading: false,
    token: '',
  } as UserState),

  getters: {
    isLoggedIn: (state) => Boolean(state.token),
  },

  actions: {
    

    logout () {
      this.token = ''
      this.name = ''
      this.isLoading = false
    },
  },
})
