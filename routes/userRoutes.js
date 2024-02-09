const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../middleware/authentication");
const router = express.Router();
//router.route("/getUser").post(userController.login);
router.post("/login", userController.login);
router.get("/viewTickets", authController.jwtCheck, userController.viewTickets);
module.exports = router;
