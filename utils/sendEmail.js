const nodemailer = require("nodemailer");

const sentMessage = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ssnmggs@gmail.com",
        pass: "kqhsktorbbciwpti",
      },
    });

    const mailOptions = {
      from: "ssnmggs@gmail.com",
      to,
      subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    return { success: false, error };
  }
};


module.exports = sentMessage;