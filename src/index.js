const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/user.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);

module.exports = app;
