const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();

router.get("/pdf", [verifyToken, verifyAdmin], controller.getPDF);
router.get("/", [verifyToken, verifyAdmin], controller.getGrade);

module.exports = router;
