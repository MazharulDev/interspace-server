/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type IReview = {
  _id: string;
  text: string;
  author: {
    type: Types.ObjectId;
    _id: Types.ObjectId;
  };
  serviceId: {
    type: Types.ObjectId;
    _id: Types.ObjectId;
  };
};

export type IReviewFilters = {
  searchTerm?: string;
  text?: string;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;
