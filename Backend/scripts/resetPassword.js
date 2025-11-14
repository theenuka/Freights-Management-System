/*
  Usage:
    node scripts/resetPassword.js <email> <newPassword>

  Requires .env with DB and PASS set.
*/
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const CryptoJs = require('crypto-js');
const User = require('../models/user');

async function run() {
  const [,, email, newPassword] = process.argv;
  if (!email || !newPassword) {
    console.error('Usage: node scripts/resetPassword.js <email> <newPassword>');
    process.exit(1);
  }

  if (!process.env.DB || !process.env.PASS) {
    console.error('Missing DB or PASS in environment. Check your .env file.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.DB);
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found:', email);
      process.exit(2);
    }
    user.password = CryptoJs.AES.encrypt(newPassword, process.env.PASS).toString();
    await user.save();
    console.log('Password reset successfully for', email);
    process.exit(0);
  } catch (err) {
    console.error('Error resetting password:', err.message);
    process.exit(3);
  }
}

run();
