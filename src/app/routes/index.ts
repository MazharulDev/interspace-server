import express from "express";
import { UserRoutes } from "../modules/allUser/allUser.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UsersRoutes } from "../modules/user/users.routes";
import { AdminRoutes } from "../modules/admin/admin.route";

const router = express.Router();

const modulesRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/users",
    route: UsersRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
