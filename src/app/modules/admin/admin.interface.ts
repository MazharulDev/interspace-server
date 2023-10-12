export type IAdmin = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "admin";
  phoneNumber: string;
  password: string;
};

export type IAdminFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
};
