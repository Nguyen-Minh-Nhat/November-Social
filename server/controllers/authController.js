const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { upload, transporter, deleteTmp } = require("../utils");
const sendMail = require("./sendMail");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const { CLIENT_URL } = process.env;
const saltRounds = 10;
const User = require("../models/User");
const Otp = require("../models/Otp");
const authController = {
  checkEmail: async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user)
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

      const url = `${CLIENT_URL}/activate/${activation_token}`;
      sendMail(email, url, "Verify your email address", "register", name);

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
        path: "/",
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
      } else {
        const newUser = new User({
          name,
          email,
          password: passwordHash,
          avatar: picture,
        });
        await newUser.save();
        user = newUser;
      }
      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        path: "/",
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
  facebookLogin: async (req, res) => {
    try {
      const { name, picture, email } = req.body;

      const password = email + process.env.FACEBOOK_SECRET;

      const passwordHash = await bcrypt.hash(password, 12);

      let user = await User.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect." });
      } else {
        const newUser = new User({
          name,
          email,
          password: passwordHash,
          avatar: picture,
        });
        await newUser.save();
        user = newUser;
      }
      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "strict",
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
      res.clearCookie("refresh_token", { path: "/" });
      return res.json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const newOtp = new Otp({ email, otp });
      newOtp.otp = bcrypt.hashSync(otp, saltRounds);
      await newOtp.save();
      sendMail(email, "", otp, "forgotPassword", user.name);
      res.json({ msg: "reset password, please check your email." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { password, email } = req.body;
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });
      const passwordHash = await bcrypt.hash(password, 12);
      await User.findOneAndUpdate(
        { email },
        {
          password: passwordHash,
        },
      );
      res.json({ msg: "Password successfully changed!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  confirmOTP: async (req, res) => {
    const { email, otp } = req.body;
    try {
      const otpList = await Otp.find({ email });
      console.log(otpList);
      if (otpList.length === 0)
        return res.status(400).json({ msg: "You use an Expired OTP!" });
      const dbOtp = otpList[otpList.length - 1];
      const check = await bcrypt.compare(otp, dbOtp.otp);
      if (check) return res.status(200).json({ msg: "OTP is correct" });
      else return res.status(400).json({ msg: "OTP is incorrect" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refresh_token;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });

        const access_token = createAccessToken({ id: user.id });
        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          path: "/",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: "strict",
        });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
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
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authController;
