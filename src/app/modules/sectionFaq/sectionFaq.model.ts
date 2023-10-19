import { Schema, model } from "mongoose";
import { ISectionFaq } from "./sectionFaq.interface";

export const SectionFaqSchema = new Schema<ISectionFaq>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const SectionFaq = model<ISectionFaq>("SectionFaq", SectionFaqSchema);
