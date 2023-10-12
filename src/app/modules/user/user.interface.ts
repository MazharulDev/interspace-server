/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type IUser = {
  name: string;
  email: string;
  image?: string;
  role: string;
  phoneNumber: string;
  password: string;
};

export type UserModel = {
  isUserExist(id: string): Promise<Pick<IUser, "email" | "password" | "role">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
};
