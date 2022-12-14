const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();

router.get("/", [verifyToken], controller.getGrade);

module.exports = router;
