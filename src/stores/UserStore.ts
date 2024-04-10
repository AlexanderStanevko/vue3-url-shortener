import { defineStore } from 'pinia';
import { User } from 'types';

type UserState = User & {
  token: string;
};

export const useUserStore = defineStore({
  id: 'UserStore',

  state: () =>
    ({
      userData: null,
      token: '',
    } as UserState),

  getters: {
    isLoggedIn: (state) => Boolean(state.userData?.email),
  },

  actions: {
    createUser(userData: User['userData']) {
      this.userData = userData;
    },
    logout() {
      this.token = '';
      this.userData = null;
    },
  },
});
