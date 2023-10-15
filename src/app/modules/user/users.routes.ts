import express from "express";
import { UserController } from "./users.controller";
const router = express.Router();

router.get(
  "/",

  UserController.getAllUsers
);
router.patch("/:id", UserController.updateUser);

export const UsersRoutes = router;
