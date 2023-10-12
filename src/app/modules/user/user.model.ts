import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

export const UserSchema = new Schema<IUser, UserModel>(
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
      required: true,
      default: "user",
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

export const User = model<IUser, UserModel>("User", UserSchema);
