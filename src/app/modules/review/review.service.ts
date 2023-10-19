import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { Service } from "../service/service.model";
import { reviewSearchableFields } from "./review.constant";
import { IReview, IReviewFilters } from "./review.interface";
import { Review } from "./review.model";
import { IService } from "../service/service.interface";

const createReview = async (payload: IReview): Promise<IReview> => {
  const review = await Review.create(payload);
  const reviewId = review._id;
  const serviceId = review.serviceId;
  await Service.findByIdAndUpdate(serviceId, {
    $push: { reviews: { $each: [reviewId], $position: 0 } },
  });
  return review;
};

const getAllReview = async (
  filters: IReviewFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IReview[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: reviewSearchableFields.map((field) => ({
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

  const result = await Review.find(whereConditions)
    .populate("author")
    .populate("serviceId")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteReviewById = async (id: string): Promise<IService | null> => {
  const service = await Review.findById(id);
  if (!service) {
    throw new Error("review not found");
  }
  const serviceId = service.serviceId;
  await Service.findByIdAndDelete(id);
  const result = await Service.findByIdAndUpdate(serviceId, {
    $pull: { reviews: id },
  });
  return result;
};

export const ReviewService = {
  createReview,
  getAllReview,
  deleteReviewById,
};
