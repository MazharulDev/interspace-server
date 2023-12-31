import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { userFilterableFields } from "../user/users.constant";
import { paginationFields } from "../../../constants/pagination";
import { AdminService } from "./admin.service";
import sendResponse from "../../../shared/sendResponse";
import { IAdmin } from "./admin.interface";
import httpStatus from "http-status";
import { IUser } from "../allUser/allUser.interface";

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmins(filters, paginationOptions);

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const { ...adminData } = req.body;

  const result = await AdminService.updateAdmin(email, adminData);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.deleteAdmin(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

const updateById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...adminData } = req.body;

  const result = await AdminService.updateById(id, adminData);

  sendResponse<IUser | IAdmin | undefined>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Updated successfully",
    data: result,
  });
});

const singleAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.singleAdminById(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin retrieved successfully",
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  updateById,
  singleAdminById,
};
