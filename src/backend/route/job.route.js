const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJob,
  getOneJob,
  deleteJob,
  getJobByUserId,
  updateJob,
  getJobControlBy,
  getJobApproveBy,
} = require("../controllers/JobController");

router.post("/", createJob);
router.get("/approveby", getJobApproveBy);
router.get("/", getAllJob);
router.get("/:id", getOneJob);
router.get("/user/:id", getJobByUserId);
router.get("/controlby/:id", getJobControlBy);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
