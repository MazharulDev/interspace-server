"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const allUser_route_1 = require("../modules/allUser/allUser.route");
const auth_route_1 = require("../modules/auth/auth.route");
const users_routes_1 = require("../modules/user/users.routes");
const admin_route_1 = require("../modules/admin/admin.route");
const service_route_1 = require("../modules/service/service.route");
const booking_route_1 = require("../modules/booking/booking.route");
const review_route_1 = require("../modules/review/review.route");
const userReview_route_1 = require("../modules/userReview/userReview.route");
const sectionFaq_route_1 = require("../modules/sectionFaq/sectionFaq.route");
const router = express_1.default.Router();
const modulesRoutes = [
    {
        path: "/all-users",
        route: allUser_route_1.AllUserRoutes,
    },
    {
        path: "/users",
        route: users_routes_1.UsersRoutes,
    },
    {
        path: "/admin",
        route: admin_route_1.AdminRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/service",
        route: service_route_1.ServiceRoutes,
    },
    {
        path: "/booking",
        route: booking_route_1.BookingRoutes,
    },
    {
        path: "/review",
        route: review_route_1.ReviewRoutes,
    },
    {
        path: "/user-review",
        route: userReview_route_1.UserReviewRoutes,
    },
    {
        path: "/faq-section",
        route: sectionFaq_route_1.SectionFaqRoutes,
    },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
