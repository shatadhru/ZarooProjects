const express = require("express");
const router = express.Router();
const User = require("../../models/AuthenticationMOdel");
const bcrypt = require("bcrypt");
const sentMessage  = require("./../../utils/sendEmail");
const OtpVerification = require("../../models/OtpVerifications");



router.post("/register", async (req, res) => {
  const { useremail, username, password } = req.body;

  if (!username || !password || !useremail) {
    return res.status(400).json({ message: "All feilds are required" });
  }
  const hassedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ username, useremail, password: hassedPassword });
    await newUser.save();
    res.status(200).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).send({ message: "Something Went Wrong" });
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
        res.status(200).send({message: "User logged in successfully"})
    }else{
        res.status(400).json({message: "Invalid username or password"})
    }

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/forgetpassword", async (req, res) => {
  const { useremail } = req.body;

  try {
    const user = await User.findOne({ useremail });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

  console.log(otp)
    const NewOtp = new OtpVerification({ useremail, otp });
    await NewOtp.save();

    await sentMessage(
      useremail,
      "OTP Verification",
      `Your OTP code is: ${otp}`
    );

    res.status(200).send({ message: "OTP has been sent to your email" });
  } catch (error) {
    console.error("Forget password error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});



router.post("/otp_verifications", async (req, res) => {
  const { otp, useremail } = req.body; ;




  try {

    const validateOtp = await OtpVerification.findOne({ useremail: useremail , otp : otp });
    if (validateOtp) {
      res.status(200).json({ message: "Email Successfully Verified" });
    }else{
       res.status(400).json({ message: "Invalid OTP" });
    }
    
  } catch (error) {
    console.log(error)
  }



});

router.post("/resetPassword", async (req, res) => {
  const { useremail, newPassword } = req.body; 

  try {

    const user = await User.findOne({ useremail: useremail });

    if(user){ 
      user.password === newPassword ;
      await user.save ;
      res.status(200).json({ message: "Password Successfully Changed" });
    }
    
  } catch (error) {
    res.status(400).json({ message: "Somethinf Wend Wrong" });

  }


});

router.post("/face/capture", async (req, res) => {
  const { image , username } = req.body;

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }

console.log(image , username)

res.status(200).json({ message: " Successfully Captured" });


});







module.exports = router;
