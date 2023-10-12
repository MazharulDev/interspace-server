import { IAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { Users } from "../user/users.model";
import { IUser } from "./allUser.interface";
import { AllUsers } from "./allUser.model";

const createUser = async (user: IUser): Promise<IUser | null> => {
  user.role = "user";
  const userAdded = await Users.create(user);
  const userInfo = {
    email: userAdded.email,
    password: user.password,
    role: userAdded.role,
    user: userAdded._id,
  };
  const result = await AllUsers.create(userInfo);
  return result;
};
const createAdmin = async (admin: IAdmin): Promise<IUser | null> => {
  admin.role = "admin";
  const adminAdded = await Admin.create(admin);
  const adminInfo = {
    email: adminAdded.email,
    password: admin.password,
    role: adminAdded.role,
    user: adminAdded._id,
  };
  const result = await AllUsers.create(adminInfo);

  return result;
};

export const UserService = {
  createUser,
  createAdmin,
};
