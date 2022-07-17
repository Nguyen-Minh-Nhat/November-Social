const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const commentController = require("../controllers/commentController");

//Create a comment
router.post("/create", verifyToken, commentController.create);

//Get all comment of a post
router.get("/:id", verifyToken, commentController.getComments);
router.get("/reply/:id", verifyToken, commentController.getReplyComments);

//Update a comment
router.put("/update/:id", verifyToken, commentController.update);
//like
router.patch("/like/:id", verifyToken, commentController.like);

//Delete a comment
router.delete("/delete/:id", verifyToken, commentController.delete);

module.exports = router;
