const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const authController = require("../controllers/authController");

//send otp
// router.post("/otp", authController.sendOTP);

// //comfirmOTP

//Register an account
router.post("/checkEmail", authController.checkEmail);
router.post("/register", authController.register);
router.post("/activation", authController.activateEmail);
router.post("/logout", authController.logout);
router.post("/google_login", authController.googleLogin);
router.post("/facebook_login", authController.facebookLogin);
router.get("/logout", authController.logout);
router.post("/forgot_password", authController.forgotPassword);
router.post("/confirm_otp", authController.confirmOTP);
router.post("/reset_password", authController.resetPassword);
router.post("/refresh_token", authController.refreshToken);
//Login
router.post("/login", authController.login);

//Auth

module.exports = router;
