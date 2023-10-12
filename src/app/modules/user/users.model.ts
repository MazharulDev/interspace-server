import { Schema, model } from "mongoose";
import { role } from "./users.constant";
import { IUsers } from "./users.interface";

export const UserSchema = new Schema<IUsers>(
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
      default: "user",
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

export const Users = model<IUsers>("User", UserSchema);
