import { Nullable } from 'utils/nullable';
import { User } from 'types';

export type UserLoginResponse = {
  success: boolean;
  token: string;
  user: Nullable<User>;
};
