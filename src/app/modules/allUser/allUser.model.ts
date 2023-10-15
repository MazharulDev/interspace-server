/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./allUser.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const AllUsersSchema = new Schema<IUser, Record<string, never>>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

AllUsersSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, "email" | "password" | "role"> | null> {
  return await AllUsers.findOne({ email }, { email: 1, password: 1, role: 1 });
};

AllUsersSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

AllUsersSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const AllUsers = model<IUser, UserModel>("AllUsers", AllUsersSchema);
