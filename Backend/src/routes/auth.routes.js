const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { registerValidationRules, loginValidationRules } = require("../validation/auth.validator");

const router = Router();

router.post("/register", registerValidationRules(), authController.registerUser);

router.post("/login", loginValidationRules(), authController.loginUser);

router.get("/get-me", authMiddleware.authUser, authController.getMe);

router.get("/logout",authController.logoutUser);

module.exports = router;
