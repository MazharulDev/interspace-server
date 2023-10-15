import { Schema, model } from "mongoose";
import { IAdmin } from "./admin.interface";
import { role } from "./admin.constant";

export const AdminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: role,
      default: "admin",
      required: true,
    },
    phoneNumber: {
      type: String,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Admin = model<IAdmin>("Admin", AdminSchema);
