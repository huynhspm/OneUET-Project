const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createClass);
router.get("/", controller.getAllClasses);

router.get("/:id", controller.getClassById);
router.put("/:id", controller.updateClass);
router.delete("/:id", controller.deleteClass);

router.post("/:id/teacher", controller.addTeacher);
router.get("/:id/teacher", controller.getAllTeachers);

router.get("/:id/course", controller.getCourse);

module.exports = router;
