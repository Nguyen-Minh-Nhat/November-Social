const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const authController = require("../controllers/authController");

//send otp
// router.post("/otp", authController.sendOTP);

// //comfirmOTP
// router.post("/confirmOtp", authController.confirmOTP);

//Register an account
router.post("/checkEmail", authController.checkEmail);
router.post("/register", authController.register);
router.post("/activation", authController.activateEmail);
router.post("/logout", authController.logout);
router.post("/google_login", authController.googleLogin);

//Login
router.post("/login", authController.login);

//Auth
router.get("/", verifyToken, authController.auth);

module.exports = router;
