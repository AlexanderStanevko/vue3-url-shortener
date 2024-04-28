import { defineStore } from 'pinia';
import { JWT_STORAGE_KEY } from 'utils/global';
import { handleAPIRequest } from 'utils/handleAPIRequest';
import { Nullable } from 'utils/nullable';
import { SessionStorage } from 'utils/storage';
import { UserLoginRequest } from 'types/request';
import { UserLoginResponse } from 'types/response';

import { User } from 'types';

type UserState = {
  user: Nullable<User>;
  token: string;
  isLoading: boolean;
};

export const useUserStore = defineStore({
  id: 'UserStore',

  state: () =>
    ({
      user: null,
      token: '',
      isLoading: false,
    } as UserState),

  getters: {
    isLoggedIn: (state) => Boolean(state.token),
    getUser: (state) => state.user,
  },

  actions: {
    createUser(userData: User) {
      this.user = userData;
    },

    async login(request: UserLoginRequest) {
      const res = await handleAPIRequest<UserLoginResponse, UserLoginRequest>({
        controller: 'auth',
        method: 'login',
        body: { ...request },
      });

      if (res?.token) {
        SessionStorage.set(JWT_STORAGE_KEY, res.token);
      }

      return res;
    },
    logout() {
      this.token = '';
      this.user = null;
      this.isLoading = false;
    },
  },
});
