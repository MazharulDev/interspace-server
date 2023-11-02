import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBooking, IBookingFilters } from "./booking.interface";
import { Booking } from "./booking.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { bookingSearchableFields } from "./booking.constant";
import { SortOrder } from "mongoose";

const createService = async (bookInfo: IBooking): Promise<IBooking | null> => {
  const packageFind = await Booking.find({
    packageName: bookInfo.packageName,
  });
  const exist = packageFind.some((pack) => pack.email === bookInfo.email);

  if (exist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already booked this connection"
    );
  }
  const result = await Booking.create(bookInfo);
  return result;
};

const getAllBooking = async (
  filters: IBookingFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBooking[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookingSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Booking.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Booking.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getBookingByEmail = async (email: string): Promise<IBooking[] | null> => {
  const result = await Booking.find({ email: email });
  return result;
};

const deleteBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndDelete(id);
  return result;
};

const updateBookingStatus = async (
  id: string,
  payload: Partial<IBooking>
): Promise<IBooking | null> => {
  const result = await Booking.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const bookingByEmail = async (email: string) => {
  const result = await Booking.findOne({ email: email });
  return result;
};

export const BookingService = {
  createService,
  getAllBooking,
  deleteBooking,
  updateBookingStatus,
  getBookingByEmail,
  bookingByEmail,
};
