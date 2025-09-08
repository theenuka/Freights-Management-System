const ejs = require("ejs");
const dotenv = require("dotenv");
const sendMail = require("../helpers/sendMail");
const Parcel = require("../models/Parcel");
dotenv.config();

// Helper to send email - helper function
const sendParcelEmail = async (parcel, recipientEmail) => {
  ejs.renderFile(
    "templates/deliveredparcel.ejs",
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

      const messageOption = { //If rendering succeeds
        from: process.env.EMAIL,
        to: recipientEmail,
        subject: "Your parcel has been delivered",
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

//Main Function: SendParcelPendingEmail

const SendParcelDeliveredEmail = async () => {
  const parcels = await Parcel.find({ status: 2 });

  for (let parcel of parcels) {
    // Send email to sender
    await sendParcelEmail(parcel, parcel.senderemail);

    // Send email to recipient
    await sendParcelEmail(parcel, parcel.recipientemail);

    // Update parcel status to 3 (delivered email sent)
    await Parcel.findByIdAndUpdate(parcel._id, { $set: { status: 3 } });
  }
};

module.exports = { SendParcelDeliveredEmail };
