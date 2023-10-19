import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUserReview } from "./userReview.interface";
import httpStatus from "http-status";
import { UserReviewService } from "./userReview.service";
import pick from "../../../shared/pick";
import { userReviewFilterableFields } from "./userReview.constant";
import { paginationFields } from "../../../constants/pagination";

const createUserReview = catchAsync(async (req: Request, res: Response) => {
  const { ...userReviewData } = req.body;
  const result = await UserReviewService.createUserReview(userReviewData);
  sendResponse<IUserReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "UserReview created successfully",
    data: result,
  });
});

const getAllUserReview = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userReviewFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserReviewService.getAllUserReview(
    filters,
    paginationOptions
  );

  sendResponse<IUserReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "UserReview retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getPublishReview = catchAsync(async (req: Request, res: Response) => {
  const result = await UserReviewService.getPublishReview();
  sendResponse<IUserReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "UserReview get successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...userReviewData } = req.body;
  const result = await UserReviewService.updateReview(id, userReviewData);
  sendResponse<IUserReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "update userReview successfully",
    data: result,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserReviewService.getById(id);
  sendResponse<IUserReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "userReview get successfully",
    data: result,
  });
});

export const UserReviewController = {
  createUserReview,
  getAllUserReview,
  getPublishReview,
  updateReview,
  getById,
};
