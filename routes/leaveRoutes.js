import express from "express";
const router = express.Router();
 
import {
  createLeave,
  getLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave
} from "../controllers/leaveController.js";
 

router.post("/", createLeave);
 
router.get("/", getLeaves);
 

router.get("/:id", getLeaveById);
 

router.put("/:id", updateLeave);
 

router.delete("/:id", deleteLeave);
 
export default router;