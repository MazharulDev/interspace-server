import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { userSearchableFields } from "./users.constant";
import { Users } from "./users.model";
import { IUserFilters, IUsers } from "./users.interface";
import { IUser } from "../allUser/allUser.interface";
import { AllUsers } from "../allUser/allUser.model";

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUsers[]>> => {
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

  const result = await Users.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Users.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateUser = async (
  email: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await Users.findOneAndUpdate({ email: email }, payload, {
    new: true,
  });
  return result;
};

const updateById = async (
  id: string,
  payload: IUser
): Promise<IUser | null> => {
  const result = await Users.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await AllUsers.findOneAndDelete({ user: id });
  if (result?._id) {
    await Users.findByIdAndDelete(id);
  }
  return result;
};

export const UserService = {
  getAllUsers,
  updateUser,
  updateById,
  deleteUser,
};
