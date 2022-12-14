const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user-schema");

const registerUser = asyncHandler(async (req, res) => {
  const { name, role, department, password, employee_code } = req.body;
  // Check user exists
  const userExist = await User.findOne({ employee_code });
  if (userExist) {
    return res.json({ msg: "รหัสพนักงานนี้มีในระบบอยู่แล้ว" });
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    role,
    department,
    password: hashedPassword,
    employee_code,
  });

  if (user) {
    res.status(201).json({
      msg: "เพิ่มผู้ใช้สำเร็จ",
      data: {
        _id: user.id,
        name: user.name,
      },
    });
  } else {
    res.status(400).json({
      msg: "ไม่พบข้อมูล",
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { employee_code, password } = req.body;
  const user = await User.findOne({ employee_code });

  // Check User
  if (user && bcrypt.compareSync(password, user.password)) {
    return res.json({
      msg: "Login User",
      data: {
        _id: user.id,
        employee_code: user.employee_code,
        name: user.name,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  }
  res.json({ msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
});

const checkPassword = () => {
  return;
};

const generateToken = (id) => {
  // console.log(process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const getAllUser = (req, res, next) => {
  User.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

const getOneUser = (req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (data) {
      res.json(data);
      return;
    }
    res.json({ msg: "ไม่พบผู้ใช้", data: error });
  });
};

const updateUser = asyncHandler(async (req, res) => {
  const { employee_code } = req.body;
  const empCodeExist = await User.findOne({ employee_code });
  if (empCodeExist) {
    res.json({ msg: "รหัสพนักงานนี้มีในระบบอยู่แล้ว" });
    return;
  }
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
    if (data) {
      res.json({ msg: "อัพเดทข้อมูลสำเร็จ" });
      return;
    }
    throw new Error("ไม่พบข้อมูล");
  });
});

const deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    res.json({ msg: "ลบผู้ใช้สำเร็จ" });
  });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
};
