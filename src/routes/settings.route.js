import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { getAllSettings, updateClientsListing } from "../controllers/settings.controller.js";

const router = Router();

router.get("/", isLoggedIn, getAllSettings);
router.post("/clients", isLoggedIn, updateClientsListing);

export default router;
