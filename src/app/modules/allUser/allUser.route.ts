import express from "express";
import { UserController } from "./allUser.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./allUser.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);
router.post(
  "/create-admin",
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createAdmin
);
router.get("/:email", UserController.getSingleUser);

export const AllUserRoutes = router;
