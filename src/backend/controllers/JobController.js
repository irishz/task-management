const asyncHandler = require("express-async-handler");
const Job = require("../models/job-schema");
const User = require("../models/user-schema");

const createJob = asyncHandler(async (req, res) => {
  const {
    topic,
    job_detail_1,
    job_detail_2,
    staff_req,
    department_req,
    ref_loss_cost_reduction,
    share_cost,
    status,
  } = req.body;

  const job = await Job.create({
    topic,
    job_detail_1,
    job_detail_2,
    staff_req,
    department_req,
    ref_loss_cost_reduction,
    share_cost,
    status,
  });

  if (job) {
    res.status(200).json({
      msg: "เพิ่มคำร้องของานใหม่สำเร็จ",
    });
    return;
  }
  res.status(400).json({
    msg: "เกิดข้อผิดพลาด ไม่พบข้อมูล",
  });
});

const getAllJob = (req, res, next) => {
  Job.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

const getJobByUserId = asyncHandler(async (req, res) => {
  await Job.find({ staff_req: req.params.id }, (err, data) => {
    if (data) {
      res.json(data);
      return;
    }
    res.json({ msg: "เกิดข้อผิดพบพลาด ไม่พบข้อมูล" });
  });
});

const getOneJob = (req, res) => {
  Job.findById(req.params.id, (error, data) => {
    if (data) {
      res.json(data);
      return;
    }
    res.json({ msg: "ไม่พบข้อมูล Job" });
  });
};

const getJobControlBy = asyncHandler(async (req, res) => {
  await Job.find({ control_by: req.params.id }, (err, data) => {
    if (data) {
      res.json(data);
      return;
    }
    res.json({ msg: "เกิดข้อผิดพบพลาด ไม่พบข้อมูล" });
  });
});

const getJobApproveBy = asyncHandler(async (req, res) => {
  const managerUser = await User.findOne({
    department: "COMPUTER",
    role: "manager",
  });
  if (managerUser) {
    await Job.find({ status: "wait for approve" }, (err, data) => {
      if (data) {
        res.json(data);
        return;
      }
      res.json({ msg: "เกิดข้อผิดพบพลาด ไม่พบข้อมูล" });
    });
    return;
  }
  res.json({ msg: "ไม่พบข้อมูลผู้อนุมัติ" });
});

const updateJob = asyncHandler(async (req, res) => {
  Job.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
    if (data) {
      res.json({ msg: "อัพเดทข้อมูลสำเร็จ" });
      return;
    }
    res.json({ msg: error });
  });
});

const deleteJob = (req, res, next) => {
  Job.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    }
    res.json({ msg: "ลบช้อมูลสำเร็จ" });
  });
};

module.exports = {
  createJob,
  getAllJob,
  getOneJob,
  getJobByUserId,
  getJobControlBy,
  updateJob,
  deleteJob,
  getJobApproveBy,
};
