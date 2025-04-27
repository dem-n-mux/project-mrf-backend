import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = Router();

router.get("/", isLoggedIn, getDashboard);

export default router;
