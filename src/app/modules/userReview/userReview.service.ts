import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { userReviewSearchableFields } from "./userReview.constant";
import { IUserReview, IUserReviewFilters } from "./userReview.interface";
import { UserReview } from "./userReview.model";

const createUserReview = async (
  userReview: IUserReview
): Promise<IUserReview | null> => {
  const result = await UserReview.create(userReview);
  return result;
};

const getAllUserReview = async (
  filters: IUserReviewFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUserReview[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userReviewSearchableFields.map((field) => ({
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

  const result = await UserReview.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await UserReview.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getPublishReview = async () => {
  const result = await UserReview.find({ status: "publish" });
  return result;
};

const updateReview=async(id:string,payload:IUserReview) =>{
  const result=await UserReview.findByIdAndUpdate(id,payload,{new:true})
  return result;
}
const getById=async(id:string)=>{
  const result=await UserReview.findById(id)
  return result
}

export const UserReviewService = {
  createUserReview,
  getAllUserReview,
  getPublishReview,
  updateReview,
  getById
};
