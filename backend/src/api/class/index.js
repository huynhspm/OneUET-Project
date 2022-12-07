const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();

router.post("/", [verifyToken, verifyAdmin], controller.createClass);
router.get("/", [verifyToken], controller.getAllClasses);

router.put("/:id", [verifyToken, verifyAdmin], controller.updateClass);
router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteClass);
router.get("/:id", [verifyToken], controller.getClass);
router.post("/:id", [verifyToken, verifyAdmin], controller.addClass);

module.exports = router;
