import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./allUser.service";
import { IUser } from "./allUser.interface";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;
  const result = await UserService.createAdmin(adminData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await UserService.getSingleUser(email);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get single user",
    data: result,
  });
});

export const UserController = {
  createUser,
  createAdmin,
  getSingleUser,
};
