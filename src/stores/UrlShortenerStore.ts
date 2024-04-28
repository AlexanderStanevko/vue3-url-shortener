import { defineStore } from 'pinia';
import { handleAPIRequest } from 'utils/handleAPIRequest';
// import { Nullable } from 'utils/nullable';
import { CreateShortUrlRequest } from 'types/request';
import { CreateShortUrlResponse } from 'types/response';
import { UrlData } from 'types';

type UrlShortenerState = {
  urlList: UrlData[];
};

export const useUrlShortenerStore = defineStore({
  id: 'UrlShortenerStore',

  state: () =>
    ({
      urlList: [],
    } as UrlShortenerState),

  getters: {
    getAllUrls: (state) => state.urlList,
  },

  actions: {
    async createShortUrl(request: CreateShortUrlRequest) {
      debugger;
      const res = await handleAPIRequest<
        CreateShortUrlResponse,
        CreateShortUrlRequest
      >({
        controller: 'short',
        method: 'create',
        body: { ...request },
      });

      if (res?.urlData) {
        this.urlList.push(res.urlData);
      }

      return res;
    },
  },
});