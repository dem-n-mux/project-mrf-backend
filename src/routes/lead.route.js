import { Router } from "express";
import multer from "multer";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { addLead, getLeads, uploadLeadsFromCSV } from "../controllers/lead.controller.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get("/", isLoggedIn, getLeads);
router.post("/add", isLoggedIn, addLead);
router.post("/upload-csv", isLoggedIn, upload.single("file"), uploadLeadsFromCSV);

export default router;