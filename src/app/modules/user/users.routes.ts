import express from "express";
import { UserController } from "./users.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
const router = express.Router();

router.get(
  "/",

  UserController.getAllUsers
);
router.patch("/update/:id", UserController.updateById);
router.patch("/:email", UserController.updateUser);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.deleteUser
);

export const UsersRoutes = router;
