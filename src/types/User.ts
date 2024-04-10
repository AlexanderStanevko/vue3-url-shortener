import { Nullable } from 'utils/nullable';

export type UserData = {
  name: string;
  email: string;
  phone: string;
};

export type User = {
  userData: Nullable<UserData>;
};
