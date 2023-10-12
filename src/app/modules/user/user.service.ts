import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: IUser): Promise<IUser> => {
  const userExist = await User.find({ email: payload?.email });
  const exist = userExist[0]?.email;
  if (payload.email === exist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exist!");
  }
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  createUser,
};
