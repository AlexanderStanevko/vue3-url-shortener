import { defineStore } from 'pinia';
import { JWT_STORAGE_KEY, USER_DATA } from 'utils/global';
import { handleAPIRequest } from 'utils/handleAPIRequest';
import { Nullable } from 'utils/nullable';
import { SessionStorage } from 'utils/storage';
import { UserLoginRequest, UserRegisterRequest } from 'types/request';
import { UserAuthResponse } from 'types/response';

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
      user: SessionStorage.get(USER_DATA, true) || null,
      token: SessionStorage.get(JWT_STORAGE_KEY),
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
      const res = await handleAPIRequest<UserAuthResponse, UserLoginRequest>({
        controller: 'auth',
        method: 'login',
        body: { ...request },
      });

      if (res?.token) {
        SessionStorage.set(JWT_STORAGE_KEY, res.token);
        SessionStorage.set(USER_DATA, res.user, true);

        this.user = res.user;
        this.token = res.token;
      }

      return res;
    },

    async register(request: UserRegisterRequest) {
      const res = await handleAPIRequest<UserAuthResponse, UserRegisterRequest>(
        {
          controller: 'auth',
          method: 'register',
          body: { ...request },
        }
      );

      if (res?.token) {
        SessionStorage.set(JWT_STORAGE_KEY, res.token);
        SessionStorage.set(USER_DATA, res.user, true);

        this.user = res.user;
        this.token = res.token;
      }

      return res;
    },

    logout() {
      this.token = '';
      this.user = null;
      this.isLoading = false;
      SessionStorage.remove(JWT_STORAGE_KEY);
      SessionStorage.remove(USER_DATA);
    },
  },
});
