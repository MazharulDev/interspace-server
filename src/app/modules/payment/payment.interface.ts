export type IPayment = {
  amount: number;
  email: string;
  status: IStatus;
  transactionId: string;
};

export type IStatus = "pending" | "success";
