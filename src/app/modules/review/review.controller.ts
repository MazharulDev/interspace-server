import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ReviewService } from "./review.service";
import sendResponse from "../../../shared/sendResponse";
import { IReview } from "./review.interface";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { reviewFilterableFields } from "./review.constant";
import { paginationFields } from "../../../constants/pagination";
import { IService } from "../service/service.interface";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const { ...commentData } = req.body;
  const result = await ReviewService.createReview(commentData);
  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reviewFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ReviewService.getAllReview(filters, paginationOptions);

  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const deleteReviewById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.deleteReviewById(id);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete review successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getAllReview,
  deleteReviewById,
};
