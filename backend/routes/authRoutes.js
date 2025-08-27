//handles user authentication with Express. Express library has routing and middle ware features

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

//controller functions that defines what happens when a sepific route is hit
const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

//defines a post route ie. when the user sends a POST request to this url, express will carry out corresponding function
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded"});
    }
    //Builds a public URL to the uploaded file 
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({imageUrl});
})

//export the router so it can be used in the main server file
module.exports = router;