const ejs = require("ejs");
const dotenv = require("dotenv");
const sendMail = require("../helpers/sendMail");
const Parcel = require("../models/Parcel");
dotenv.config();

// Helper to send email
const sendParcelEmail = async (parcel, recipientEmail) => {
  ejs.renderFile(
    "templates/pendingparcel.ejs",
    {
      sendername: parcel.sendername,
      from: parcel.from,
      to: parcel.to,
      recipientname: parcel.recipientname,
      cost: parcel.cost,
      weight: parcel.weight,
      note: parcel.note,
    },
    async (err, data) => {
      if (err) {
        console.log("EJS render error:", err);
        return;
      }

      const messageOption = {
        from: process.env.EMAIL,
        to: recipientEmail,
        subject: "You've got a parcel",
        html: data,
      };

      try {
        await sendMail(messageOption);
      } catch (error) {
        console.log("Mail sending error:", error);
      }
    }
  );
};

const SendParcelPendingEmail = async () => {
  const parcels = await Parcel.find({ status: 0 });

  for (let parcel of parcels) {
    // Send email to sender
    await sendParcelEmail(parcel, parcel.senderemail);

    // Send email to recipient
    await sendParcelEmail(parcel, parcel.recipientemail);

    // Update parcel status to 1 (pending email sent)
    await Parcel.findByIdAndUpdate(parcel._id, { $set: { status: 1 } });
  }
};

module.exports = { SendParcelPendingEmail };
