import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./users.constant";
import { paginationFields } from "../../../constants/pagination";
import { UserService } from "./users.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../allUser/allUser.interface";
import httpStatus from "http-status";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const { ...userData } = req.body;

  const result = await UserService.updateUser(email, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users update successfully",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  updateUser,
};
