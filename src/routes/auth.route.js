import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = Router();

router.post("/login", loginUser);
router.post("/register", isLoggedIn, registerUser); // Register route should be protected

export default router;