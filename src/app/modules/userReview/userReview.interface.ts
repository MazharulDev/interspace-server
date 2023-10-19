export type IUserReview = {
  name: string;
  text: string;
  status: string;
};

export type IUserReviewFilters = {
  searchTerm?: string;
  name?: string;
};
