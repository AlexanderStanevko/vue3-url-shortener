import { defineStore } from 'pinia';
import { handleAPIRequest } from 'utils/handleAPIRequest';
// import { Nullable } from 'utils/nullable';
import { CreateShortUrlRequest } from 'types/request';
import { CreateShortUrlResponse, DeleteShortUrlResponse } from 'types/response';
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
      const res = await handleAPIRequest<
        CreateShortUrlResponse,
        CreateShortUrlRequest
      >({
        controller: 'short',
        method: 'create',
        body: { ...request },
      });

      if (res?.urlData) {
        this.urlList.unshift(res.urlData);
      }

      return res;
    },

    async getAll() {
      const res = await handleAPIRequest<UrlData[], unknown>({
        controller: 'short',
        method: 'all',
        httpMethod: 'get',
      });

      if (res?.length) {
        this.urlList = res;
      }
    },

    async deleteShortUrl(id: number) {
      const res = await handleAPIRequest<DeleteShortUrlResponse, unknown>({
        controller: 'short',
        httpMethod: 'delete',
        params: {
          id,
        },
      });
      if (res?.success) {
        this.urlList = this.urlList.filter((url) => url.id !== id);
      }

      return res;
    },

    async redirectToOriginalUrl(shortenedCode: string) {
      await handleAPIRequest<unknown, unknown>({
        controller: 'short',
        httpMethod: 'get',
        pathParam: shortenedCode,
      });
    }
  },
});
