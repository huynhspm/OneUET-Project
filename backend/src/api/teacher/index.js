const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();

router.post("/", [verifyToken, verifyAdmin], controller.createTeacher);
router.get("/", [verifyToken], controller.getAllTeachers);

router.put("/:id", [verifyToken, verifyAdmin], controller.updateTeacher);
router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteTeacher);
router.get("/:id", [verifyToken], controller.getTeacher);
router.post("/:id", [verifyToken, verifyAdmin], controller.addTeacher);
module.exports = router;
