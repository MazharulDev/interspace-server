export type IBooking = {
  name: string;
  email: string;
  status: string;
  phoneNumber: string;
  address: string;
  packageName: string;
  paymentData?: any;
  packagePrice: string;
};

export type IBookingFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
  packageName?: string;
};
