import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ISectionFaq } from "./sectionFaq.interface";
import { SectionFaqService } from "./sectionFaq.service";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { sectionFaqFilterableFields } from "./sectionFaq.constant";
import { paginationFields } from "../../../constants/pagination";

const createSectionFaq = catchAsync(async (req: Request, res: Response) => {
  const { ...sectionFaqData } = req.body;
  const result = await SectionFaqService.createService(sectionFaqData);
  sendResponse<ISectionFaq>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question added successfully",
    data: result,
  });
});

const getAllFaq = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, sectionFaqFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SectionFaqService.getAllFaq(filters, paginationOptions);

  sendResponse<ISectionFaq[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Section faq retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const SectionFaqController = {
  createSectionFaq,
  getAllFaq,
};
