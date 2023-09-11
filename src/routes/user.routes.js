const express = require("express");
const {authenticate} = require("../middlewares/auth.middleware")
const {getUser,login,logout,register} = require("../controllers/user.controller")


const router = express.Router();

router
  .post("/user/register", register)
  .post("/user/authenticate", login)
  .post("/user/logout", authenticate, logout)
  .post("/user/get-data", authenticate, getUser);

// Add a route to display a "Server is running" message
router.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

module.exports = router;
