import { Schema, model } from "mongoose";
import { IPayment } from "./payment.interface";
import { status } from "./payment.constant";

export const PaymentSchema = new Schema<IPayment>(
  {
    amount: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: status,
    },
    transactionId: {
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

export const Payment = model<IPayment>("Payment", PaymentSchema);
