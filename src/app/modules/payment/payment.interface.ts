export type IPayment = {
  amount: number;
  email: string;
  status: IStatus;
  transactionId: string;
  packageName: string;
  month: string;
  year: string;
};

export type IStatus = "pending" | "success";
