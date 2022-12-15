const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();

router.post("/", [verifyToken, verifyAdmin], controller.createTeacher);
router.get("/", [verifyToken], controller.getTeachers);
router.get("/:id", [verifyToken], controller.getTeacher);
router.put("/:id", [verifyToken, verifyAdmin], controller.updateTeacher);
router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteTeacher);

module.exports = router;
