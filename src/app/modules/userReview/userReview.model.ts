import { Schema, model } from "mongoose";
import { IUserReview } from "./userReview.interface";

export const UserReviewSchema = new Schema<IUserReview>(
  {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const UserReview = model<IUserReview>("UserReview", UserReviewSchema);
