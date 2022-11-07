const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createCourse);
router.get("/", controller.getCourses);
router.put("/", controller.updateCourse);
router.delete("/", controller.deleteCourse);

module.exports = router;
