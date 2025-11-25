const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// connect database
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
