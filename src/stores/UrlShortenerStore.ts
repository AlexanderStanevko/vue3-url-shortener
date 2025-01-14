import { defineStore } from 'pinia';
import { handleAPIRequest } from 'utils/handleAPIRequest';
// import { Nullable } from 'utils/nullable';
import { CreateShortUrlRequest } from 'types/request';
import {
  CreateShortUrlResponse,
  DeleteShortUrlResponse,
  GetMostActiveResponse,
} from 'types/response';
import { UrlData } from 'types';

type UrlShortenerState = {
  urlList: UrlData[];
  mostActiveLinks: GetMostActiveResponse['mostActiveUrls'];
  totalClicks: GetMostActiveResponse['totalClicks'];
  uniqueClicks: GetMostActiveResponse['uniqueClicks'];
};

export const useUrlShortenerStore = defineStore({
  id: 'UrlShortenerStore',

  state: () =>
    ({
      urlList: [],
      mostActiveLinks: [],
      totalClicks: 0,
      uniqueClicks: 0,
    } as UrlShortenerState),

  getters: {
    getAllUrls: (state) => state.urlList,
    getMostActiveLinks: (state) => state.mostActiveLinks,
    getTotalClicks: (state) => state.totalClicks,
    getUniqueClicks: (state) => state.uniqueClicks,
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

    async getMostActive() {
      const res = await handleAPIRequest<GetMostActiveResponse, unknown>({
        controller: 'short',
        method: 'mostActive',
        httpMethod: 'get',
      });

      if (res) {
        this.mostActiveLinks = res.mostActiveUrls;
        this.uniqueClicks = res.uniqueClicks;
        this.totalClicks = res.totalClicks;
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
    },

    clear() {
      this.urlList = [];
      this.mostActiveLinks = [];
      this.totalClicks = 0;
      this.uniqueClicks = 0;
    },
  },
});
