import express from "express";
import { AllUserRoutes } from "../modules/allUser/allUser.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UsersRoutes } from "../modules/user/users.routes";
import { AdminRoutes } from "../modules/admin/admin.route";
import { ServiceRoutes } from "../modules/service/service.route";

const router = express.Router();

const modulesRoutes = [
  {
    path: "/all-users",
    route: AllUserRoutes,
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
  {
    path: "/service",
    route: ServiceRoutes,
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
