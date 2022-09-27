const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJob,
  getOneJob,
  deleteJob,
  getJobByUserId,
} = require("../controllers/JobController");

router.post("/", createJob);
router.get("/", getAllJob);
router.get("/:id", getOneJob);
router.get("/user/:id", getJobByUserId);
router.delete("/:id", deleteJob);

module.exports = router;
