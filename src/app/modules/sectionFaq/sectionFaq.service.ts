import { ISectionFaq } from "./sectionFaq.interface";
import { SectionFaq } from "./sectionFaq.model";

const createService = async (
  faqInfo: ISectionFaq
): Promise<ISectionFaq | null> => {
  const result = await SectionFaq.create(faqInfo);
  return result;
};

const getAllFaq = async (): Promise<ISectionFaq[]> => {
  const result = await SectionFaq.find({});
  return result;
};

export const SectionFaqService = {
  createService,
  getAllFaq,
};
