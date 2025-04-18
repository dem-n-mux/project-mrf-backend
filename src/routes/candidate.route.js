import { Router } from "express";
import multer from "multer";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
  addCandidate,
  fetchSingleCandidate,
  getCandidatesList,
} from "../controllers/candidate.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.any(), addCandidate);
router.get("/", isLoggedIn, getCandidatesList);
router.get("/:id", isLoggedIn, fetchSingleCandidate);

export default router;
