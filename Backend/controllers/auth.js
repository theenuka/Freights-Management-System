const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

//register controller

const registerUser = async (req, res) => {
  try {
    console.log("[REGISTER] Received registration request:", { 
      fullname: req.body.fullname, 
      email: req.body.email,
      hasPassword: !!req.body.password,
      age: req.body.age,
      country: req.body.country,
      hasAddress: !!req.body.address
    });
    
    const email = (req.body.email || "").trim();
    if (!email || !req.body.password || !req.body.fullname) {
      console.log("[REGISTER] Missing required fields");
      return res.status(400).json({ message: "Full name, email and password are required" });
    }

    // prevent duplicate registrations (case-insensitive)
    const existing = await User.findOne({ email: { $regex: `^${escapeRegex(email)}$`, $options: 'i' } });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const newUser = new User({
      fullname: req.body.fullname,
      email: email,
      age: req.body.age,
      country: req.body.country,
      address: req.body.address,
      role: req.body.role || 'user',
      password: CryptoJs.AES.encrypt(
        req.body.password,
        process.env.PASS
      ).toString(),
    });

    const user = await newUser.save();
    const { password, ...info } = user._doc;
    res.status(201).json(info);
  } catch (error) {
    console.error("Register error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//login controller

const escapeRegex = (str = "") => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const loginUser = async (req, res) => {
  try {
    const email = (req.body.email || "").trim();
    const passwordInput = req.body.password ?? "";
    // case-insensitive exact match on email to avoid casing pitfalls
    const user = await User.findOne({ email: { $regex: `^${escapeRegex(email)}$`, $options: 'i' } });

    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }
    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS
    );

    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
    if (originalPassword !== passwordInput) {
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

