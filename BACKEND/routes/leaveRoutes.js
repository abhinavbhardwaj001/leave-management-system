import express from "express";
import {
  applyLeave,
  getMyLeaves,
} from "../controllers/leaveController.js";

const router = express.Router();

router.post("/apply", applyLeave);
router.get("/my-leaves/:id", getMyLeaves);

export default router;