const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createCourse);
router.get("/", controller.getAllCourses);

router.get("/:id", controller.getCourseById);
router.put("/:id", controller.updateCourse);
router.delete("/:id", controller.deleteCourse);

router.get("/:id/class", controller.getAllClasses);

module.exports = router;
