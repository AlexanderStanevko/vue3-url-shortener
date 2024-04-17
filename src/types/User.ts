import { Nullable } from 'utils/nullable';

export type UserData = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  userData: Nullable<UserData>;
};
