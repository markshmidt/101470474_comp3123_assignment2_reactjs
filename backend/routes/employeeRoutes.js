const express = require("express");
const Employee = require("../models/Employee");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// --- Multer config for file upload ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // 123.png
  },
});

const upload = multer({ storage });

// POST /employees   (with optional profileImage)
router.post("/", auth, upload.single("profileImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, department, position, salary } = req.body;

    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      department,
      position,
      salary,
      profileImage: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /employees
router.get("/", auth, async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /employees/:id
router.get("/:id", auth, async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /employees/:id (update + optional new picture)
router.put("/:id", auth, upload.single("profileImage"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    const emp = await Employee.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!emp) return res.status(404).json({ message: "Employee not found" });

    res.json(emp);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /employees/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /employees/search?department=IT&position=Manager
router.get("/search/filter", auth, async (req, res) => {
  try {
    const { department, position } = req.query;
    const query = {};
    if (department) query.department = department;
    if (position) query.position = position;

    const employees = await Employee.find(query);
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
