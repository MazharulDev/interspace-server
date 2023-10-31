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
  const result = await SectionFaqService.getAllFaq();

  sendResponse<ISectionFaq[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Section faq retrieved successfully",
    data: result,
  });
});
const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SectionFaqService.deleteFaq(id);

  sendResponse<ISectionFaq>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq deleted successfully",
    data: result,
  });
});
const faqById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SectionFaqService.faqByid(id);

  sendResponse<ISectionFaq>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq retrived successfully",
    data: result,
  });
});
const updateById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...faqData } = req.body;
  const result = await SectionFaqService.updateByid(id, faqData);

  sendResponse<ISectionFaq>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq update successfully",
    data: result,
  });
});

export const SectionFaqController = {
  createSectionFaq,
  getAllFaq,
  deleteFaq,
  faqById,
  updateById,
};
