/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { IUsers } from "../user/users.interface";
import { IAdmin } from "../admin/admin.interface";

export type IUser = {
  _id: string;
  email: string;
  name?: string;
  phoneNumber?: string;
  role: string;
  password: string;
  user?: Types.ObjectId | IUsers;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, "email" | "password" | "role">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
