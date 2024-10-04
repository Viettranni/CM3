require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const jobRouter = require("./routes/jobRouter");
const userRouter = require("./routes/userRouter");
const cors = require("cors");

const {
  unknownEndpoint,
  errorHandler,
} = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.get("/", (req, res) => res.send("API Running!"));

// Use the userRouter for all /users routes
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;