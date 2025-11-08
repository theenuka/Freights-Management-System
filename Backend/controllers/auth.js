const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

//register controller

const registerUser = async (req, res) => {
  const newUser = User({
    fullname: req.body.fullname,
    email: req.body.email,
    age: req.body.age,
    country: req.body.country,
    address: req.body.address,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS
    ).toString(),
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

//login controller

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }
    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS
    );

    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }
    const { password, ...info } = user._doc;

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SEC,
      { expiresIn: "10d" }
    );

    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { registerUser, loginUser };

