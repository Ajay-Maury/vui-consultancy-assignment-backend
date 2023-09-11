const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const { blacklistedTokens } = require("../middlewares/auth.middleware");
const {
  hasEmptyValue,
  generateToken,
  getAuthBearerToken,
} = require("../utils/utils");

exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const emptyValue = hasEmptyValue(userName, email, password);

    if (emptyValue) {
      return res.status(400).send({
        message: "userName, email and password are required",
        status: false,
      });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Email already in use", status: false });
    }

    // Create a new user
    const newUser = new User({ userName, email, password });

    // Save the user to the database
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", status: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emptyValue = hasEmptyValue(email, password);

    if (emptyValue) {
      return res
        .status(500)
        .send({ message: "Email and password is required", status: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .send({ message: "Invalid credentials.", status: false });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .send({ message: "Invalid credentials.", status: false });
    }

    const token = generateToken(user._id);
    return res
      .status(200)
      .json({ token, status: true, message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { email = "" } = req.body;

    if (!email) {
      return res
        .status(400)
        .send({ message: "email is required", status: false });
    }

    const user = await User.findOne({ email }, { password: 0 });
    if (!user) {
      return res.status(404).send({
        message: `User not found for email: ${email} `,
        status: false,
      });
    }

    return res
      .status(200)
      .json({ status: true, user, message: "user fetched successful" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// In your logout route handler, add the token to the blacklist.
exports.logout = async (req, res) => {
  try {
    const token = getAuthBearerToken(req);

    // Add the token to the blacklist
    blacklistedTokens.add(token);

    res.status(200).send({ status: true, message: "Logout successful" });
  } catch (error) {
    console.log('error:', error)
    res.status(500).send({ status: false, message: error.message });
  }
};
