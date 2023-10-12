export type IUsers = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "user";
  phoneNumber: string;
  password: string;
};
export type IUserFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
};
