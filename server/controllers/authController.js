const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { upload, transporter, deleteTmp } = require("../utils");
const sendMail = require("./sendMail");

const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = import("node-fetch");
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const { CLIENT_URL } = process.env;
const saltRounds = 10;
const User = require("../models/User");
const authController = {
  // otp: Math.floor(1000 + Math.random() * 9999).toString(),
  // sendOTP: async (req, res) => {
  //   success = false;
  //   const { email } = req.body;
  //   try {
  //     //Check for exists
  //     const existUser = await User.findOne({ email });

  //     if (!existUser) {
  //       let mailOptions = {
  //         from: process.env.GMAIL_NAME,
  //         to: email,
  //         subject: "Otp for registration is: ",
  //         html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2; background:#191D29">
  //               <div style="margin:50px auto;background:white ;width:70%;padding:20px 0; padding:10px; border-radius:10px">
  //               <div style="border-bottom:1px solid #092665">
  //                 <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">NovSocial</a>
  //               </div>
  //               <p style="font-size:1.1em;">Hi,</p>
  //               <p>Thank you for choosing NovSocial. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
  //               <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${authController.otp}</h2>
  //               <p style="font-size:0.9em;">Regards,<br />NovSocial</p>
  //               </div>
  //               </div>`,
  //       };

  //       await transporter.sendMail(mailOptions);
  //       success = true;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   if (req.files) await deleteTmp(req.files);
  //   if (success) {
  //     res.json({
  //       success,
  //       message: "OTP has been send",
  //     });
  //   } else {
  //     res.json({
  //       success,
  //       message: "This email has been registered",
  //     });
  //   }
  // },

  // confirmOTP: async (req, res) => {
  //   const inputOtp = req.body.otp;
  //   if (req.files) await deleteTmp(req.files);
  //   console.log(inputOtp);
  //   console.log(authController.otp);
  //   console.log(inputOtp === authController.otp);
  //   if (inputOtp === authController.otp) {
  //     res.json({ success: true, message: "OTP is correct" });
  //   } else {
  //     res.json({ success, message: "OTP is incorrect" });
  //   }
  // },

  checkEmail: async (req, res) => {
    const { email } = req.body;
    const check = await User.findOne({ email });
    if (check)
      return res.status(400).json({ msg: "This email already exists." });
    else return res.status(200).json({ msg: "Valid email" });
  },

  //register

  register: async (req, res) => {
    const { avatar, password, name, birthDate, gender, email } = req.body;

    var avatarPath = "";
    if (!name || !email || !password)
      return res.status(400).json({ msg: "Please fill in all fields." });

    if (!validateEmail(email))
      return res.status(400).json({ msg: "Invalid emails." });

    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ msg: "This email already exists." });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters." });

    try {
      if (req.files && req.files?.avatar) {
        const file = req.files.avatar;
        avatarPath = await upload(file.tempFilePath, "novsocial/avatars");
      }
      //Create new account
      const passwordHash = bcrypt.hashSync(password, saltRounds);
      const newUser = new User({
        email,
        password: passwordHash,
        avatar: avatarPath,
        name,
        gender,
        birthDate,
      });

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/auth/activate/${activation_token}`;
      sendMail(email, url, "Verify your email address");

      res.status(201).json({
        message: "Register Success! Please activate your email to start.",
      });
      if (req.files) await deleteTmp(req.files);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  },

  //active

  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;

      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET,
      );

      const { avatar, password, name, birthDate, email } = user;

      const check = await User.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists." });

      const newUser = new User({
        email,
        password: password,
        avatar: avatar,
        name,
        birthDate,
      });
      await newUser.save();

      res.status(200).json({ msg: "Account has been activated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({
        msg: "Login success!",
        user: {
          ...user._doc,
          password: "",
        },
        access_token: access_token,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  googleLogin: async (req, res) => {
    try {
      const { email_verified, email, name, picture } = req.body;

      const password = email + process.env.GOOGLE_SECRET;

      const passwordHash = await bcrypt.hash(password, 12);

      if (!email_verified)
        return res.status(400).json({ msg: "Email verification failed." });

      let user = await User.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect." });

        // const refresh_token = createRefreshToken({ id: user._id });
        // res.cookie("refresh_token", refresh_token, {
        //   httpOnly: true,
        //   path: "/user/refresh_token",
        //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // });

        // res.json({ msg: "Login success!" });
      } else {
        const newUser = new User({
          name,
          email,
          password: passwordHash,
          avatar: picture,
        });

        await newUser.save();
        user = newUser;
        // const refresh_token = createRefreshToken({ id: newUser._id });
        // res.cookie("refresh_token", refresh_token, {
        //   httpOnly: true,
        //   path: "/user/refresh_token",
        //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // });

        // res.json({ msg: "Login success!" });
      }
      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({
        msg: "Login success!",
        user: {
          ...user._doc,
          password: "",
        },
        access_token: access_token,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refresh_token", { path: "/api/refresh_token" });
      return res.json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  auth: async (req, res) => {
    const { userID } = req.body;
    const existUser = await User.findOne({ _id: userID }).select("-password");
    res.json({
      success: true,
      msg: "Validate successfully",
      user: existUser,
    });
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload.toJSON(), process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = authController;
