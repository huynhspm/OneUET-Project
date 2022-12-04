const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createCourse);
router.get("/", controller.getAllCourses);

router.put("/:id", controller.updateCourse);
router.delete("/:id", controller.deleteCourse);
router.get("/:id", controller.getCourse);
router.post("/:id/class", controller.addCourse);

module.exports = router;
