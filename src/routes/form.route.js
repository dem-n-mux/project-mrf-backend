import { Router } from "express";
import { getClientsSearch } from "../controllers/form.controller.js";

const router = Router();

router.get("/clients", getClientsSearch);

export default router;
