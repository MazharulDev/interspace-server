import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { userSearchableFields } from "../user/users.constant";
import { IAdmin, IAdminFilters } from "./admin.interface";
import { Admin } from "./admin.model";

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

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete(id);
  return result;
};

export const AdminService = {
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};
