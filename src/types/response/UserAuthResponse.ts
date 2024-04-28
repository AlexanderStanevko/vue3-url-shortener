import { Nullable } from 'utils/nullable';
import { User } from 'types';

export type UserAuthResponse = {
  success: boolean;
  token: string;
  user: Nullable<User>;
};
