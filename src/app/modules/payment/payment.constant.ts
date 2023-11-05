import { IStatus } from "./payment.interface";

export const status: IStatus[] = ["pending", "success"];

export const paymentSearchableFields = [
  "email",
  "packageName",
  "status",
  "month",
  "year",
  "transactionId",
];
export const paymentFilterableFields = [
  "searchTerm",
  "email",
  "packageName",
  "status",
  "month",
  "year",
  "transactionId",
];
