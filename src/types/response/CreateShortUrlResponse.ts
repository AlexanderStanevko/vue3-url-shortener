import { Nullable } from 'utils/nullable';
import { UrlData } from 'types';

export type CreateShortUrlResponse = {
  message: string;
  urlData: Nullable<UrlData>;
};
