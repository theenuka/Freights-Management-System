const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

export const registerUser = async (req, res)=>{
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
}

export const loginuser=async(req, res)=>{
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
          return res.status(401).json("You have not registered");
        }
        const hashedPassword = CryptoJs.AES.decrypt(
          user.password,
          process.env.PASS
        );
    
       
      
        const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
        if (originalPassword !== req.body.password) {
          return res.status(500).json("wrong credentials");
        }
        const { password, ...info } = user._doc;
       
        const accessToken = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SEC,
          { expiresIn: "10d" }
        );
    
        res.status(200).json({ ...info, accessToken });
      } catch (error) {
        res.status(500).json(error);
      }
}