import { Schema, model } from "mongoose";
import { IService } from "./service.interface";

export const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    speed: {
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

export const Service = model<IService>("Service", ServiceSchema);
