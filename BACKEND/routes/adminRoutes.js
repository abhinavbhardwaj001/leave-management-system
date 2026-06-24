import express from "express";
import {
  getAdminDashboard,
  approveLeave,
  rejectLeave,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", getAdminDashboard);
router.post("/leaves/:id/approve", approveLeave);
router.post("/leaves/:id/reject", rejectLeave);

export default router;