const authController = require("../controllers/auth-controller");
const check = require("../middleware/check");
const express = require("express");
const homeController = require("../controllers/home-controller");
const messageController = require("../controllers/message-controller");
const router = express.Router();

router.get("/", homeController.home);

router.get("/sign-up", check.checkNotAuth, authController.signUp);

router.post("/sign-up", authController.signUpPost);

router.get("/log-in", check.checkNotAuth, authController.logIn);

router.post("/log-in", authController.logInPost);

router.get("/log-out", authController.logOut);

router.get("/message", messageController.getMessage);

router.post("/message", messageController.postMessage);

module.exports = router;
