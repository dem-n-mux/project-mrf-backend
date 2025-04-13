import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/list", isLoggedIn, getAllUsers);
router.delete("/:username", isLoggedIn, deleteUser);
router.patch("/:username", isLoggedIn, updateUser);

export default router;
