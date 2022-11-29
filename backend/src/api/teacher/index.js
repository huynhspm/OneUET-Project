const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createTeacher);
router.get("/", controller.getAllTeachers);

router.get("/:id", controller.getTeacherById);
router.put("/:id", controller.updateTeacher);
router.delete("/:id", controller.deleteTeacher);

router.get("/:id/course", controller.getCourses);

module.exports = router;
