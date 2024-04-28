import { UrlData } from 'types';

export type ShortUrlItem = UrlData & {
  createdAt: Date;
  clicks: number;
  id: number;
};
