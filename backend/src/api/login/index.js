const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.login);
router.post("/verify", controller.verifyOTP);
router.post("/forget", controller.forgetPassword);
router.post("/reset", controller.resetPassword);

module.exports = router;
