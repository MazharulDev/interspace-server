import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ServiceService } from "./service.service";
import sendResponse from "../../../shared/sendResponse";
import { IService } from "./service.interface";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { serviceFilterableFields } from "./service.constant";
import { paginationFields } from "../../../constants/pagination";

const createService = catchAsync(async (req: Request, res: Response) => {
  const { ...serviceData } = req.body;
  const result = await ServiceService.createService(serviceData);
  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

const getAllService = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServiceService.getAllService(filters, paginationOptions);

  sendResponse<IService[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Services retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceService.getSingleService(id);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceService.deleteService(id);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service delete successfully",
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...serviceData } = req.body;
  const result = await ServiceService.updateService(id, serviceData);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service update successfully",
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllService,
  getSingleService,
  deleteService,
  updateService,
};
