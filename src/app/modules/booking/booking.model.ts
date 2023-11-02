import mongoose, { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";

export const BookingSchema = new Schema<IBooking>(
  {
    name: {
      type: String,
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
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    packageName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    paymentData: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Booking = model<IBooking>("Booking", BookingSchema);
