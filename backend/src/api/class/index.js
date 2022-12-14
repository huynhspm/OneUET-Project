const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();
router.post("/", [verifyToken, verifyAdmin], controller.createClass);

router.get("/", [verifyToken], controller.getClasses);
router.put("/grade", [verifyToken, verifyAdmin], controller.updateGrade);

router.get("/:id", [verifyToken], controller.getClass);
router.put("/:id", [verifyToken, verifyAdmin], controller.updateClass);
router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteClass);

module.exports = router;
