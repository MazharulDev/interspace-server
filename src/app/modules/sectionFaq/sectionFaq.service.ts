import { ISectionFaq } from "./sectionFaq.interface";
import { SectionFaq } from "./sectionFaq.model";

const createService = async (
  faqInfo: ISectionFaq
): Promise<ISectionFaq | null> => {
  const result = await SectionFaq.create(faqInfo);
  return result;
};

const getAllFaq = async (): Promise<ISectionFaq[] | null> => {
  const result = await SectionFaq.find({});
  return result;
};
const deleteFaq = async (id: string): Promise<ISectionFaq | null> => {
  const result = await SectionFaq.findByIdAndDelete(id);
  return result;
};
const faqByid = async (id: string): Promise<ISectionFaq | null> => {
  const result = await SectionFaq.findById(id);
  return result;
};
const updateByid = async (
  id: string,
  payload: ISectionFaq
): Promise<ISectionFaq | null> => {
  const result = await SectionFaq.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const SectionFaqService = {
  createService,
  getAllFaq,
  deleteFaq,
  faqByid,
  updateByid,
};
