import express from "express";
import { UserController } from "./users.controller";
const router = express.Router();

router.get(
  "/",

  UserController.getAllUsers
);
router.patch("/:email", UserController.updateUser);

export const UsersRoutes = router;
