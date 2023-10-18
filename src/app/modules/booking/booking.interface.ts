export type IBooking = {
  name: string;
  email: string;
  status: string;
  phoneNumber: string;
  address: string;
  packageName: string;
};

export type IBookingFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
  packageName?: string;
};
