const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const userController = require("../controllers/userController");

//Search User
router.get("/search/:name", verifyToken, userController.search);
router.get("/profile/:id", verifyToken, userController.getAUser);
router.get("/following/:id", verifyToken, userController.getAllFollowingUsers);
//Update User
router.patch("/update", verifyToken, userController.updateUser);

//Follow
router.patch("/follow/:id", verifyToken, userController.follow);
router.get("/suggestionsUser", verifyToken, userController.suggestionsUser);

module.exports = router;
