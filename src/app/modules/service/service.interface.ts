export type IService = {
  _id: string;
  title: string;
  price: string;
  speed: string;
};

export type IServiceFilters = {
  searchTerm?: string;
  title?: string;
};
