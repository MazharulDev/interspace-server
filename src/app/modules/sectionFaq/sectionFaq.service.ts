import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { sectionFaqSearchableFields } from "./sectionFaq.constant";
import { ISectionFaq, ISectionFaqFilters } from "./sectionFaq.interface";
import { SectionFaq } from "./sectionFaq.model";

const createService = async (
  faqInfo: ISectionFaq
): Promise<ISectionFaq | null> => {
  const result = await SectionFaq.create(faqInfo);
  return result;
};

const getAllFaq = async (
  filters: ISectionFaqFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISectionFaq[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: sectionFaqSearchableFields.map((field) => ({
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

  const result = await SectionFaq.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await SectionFaq.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const SectionFaqService = {
  createService,
  getAllFaq,
};
