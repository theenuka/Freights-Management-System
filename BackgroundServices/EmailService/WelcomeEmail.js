const ejs = require("ejs");
const dotenv = require("dotenv");
const sendMail = require("../helpers/sendMail");
const User = require("../models/User");
const CryptoJs = require("crypto-js");

dotenv.config();

const sendWelcomeEmail = async () => {
  const users = await User.find({ status: 0 });

  for (let user of users) {
    // Decrypt the password
    const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS);
    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    // Render the email template
    ejs.renderFile(
      "templates/welcome.ejs",
      { fullname: user.fullname, password: originalPassword, email: user.email },
      async (err, data) => {
        if (err) {
          console.log("EJS render error:", err);
          return;
        }

        const messageOption = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Welcome to FMS",
          html: data,
        };

        try {
          await sendMail(messageOption); // Ensure email is sent before updating status
          await User.findByIdAndUpdate(user._id, { $set: { status: 1 } });
        } catch (error) {
          console.log("Mail sending error:", error);
        }
      }
    );
  }
};

module.exports = { sendWelcomeEmail };
