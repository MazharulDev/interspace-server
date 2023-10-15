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
    admin: adminAdded._id,
  };
  const result = await AllUsers.create(adminInfo);

  return result;
};

const getSingleUser = async (email: string): Promise<IUser | null> => {
  const result = await AllUsers.findOne({ email: email })
    .populate("user")
    .populate("admin");
  return result;
};

const updateAllUser = async (email: string, payload: any) => {
  const result = await AllUsers.findOneAndUpdate({ email: email }, payload, {
    new: true,
  });
  return result;
};

export const UserService = {
  createUser,
  createAdmin,
  getSingleUser,
  updateAllUser,
};
