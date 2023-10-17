import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { userSearchableFields } from "../user/users.constant";
import { IAdmin, IAdminFilters } from "./admin.interface";
import { Admin } from "./admin.model";
import { AllUsers } from "../allUser/allUser.model";
import { IUser } from "../allUser/allUser.interface";
import { Users } from "../user/users.model";

const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Admin.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateAdmin = async (
  email: string,
  payload: IAdmin
): Promise<IAdmin | null> => {
  const result = await Admin.findOneAndUpdate({ email: email }, payload, {
    new: true,
  });
  return result;
};

const deleteAdmin = async (id: string): Promise<IUser | null> => {
  const result = await AllUsers.findOneAndDelete({ admin: id });
  if (result?._id) {
    await Admin.findByIdAndDelete(id);
  }
  return result;
};

const updateById = async (
  id: string,
  payload: IAdmin
): Promise<IAdmin | null | undefined | IUser> => {
  let result;
  if (payload.role === "admin") {
    result = await Admin.findByIdAndUpdate(id, payload, { new: true });
    return result;
  } else if (payload.role === "user") {
    const insertData = {
      name: payload.name,
      email: payload.email,
      role: payload.role,
      phoneNumber: payload.phoneNumber,
    };
    const result = await Users.create(insertData);
    await AllUsers.findOneAndUpdate(
      { admin: id },
      { role: payload.role, user: result._id }
    );
    await Admin.findByIdAndDelete(id);
    return result;
  }

  return result;
};

const singleAdminById = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id);
  return result;
};

export const AdminService = {
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  updateById,
  singleAdminById,
};
