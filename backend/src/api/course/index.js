const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();

router.post("/", [verifyToken, verifyAdmin], controller.createCourse);
router.get("/", [verifyToken], controller.getAllCourses);

router.put("/:id", [verifyToken, verifyAdmin], controller.updateCourse);
router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteCourse);
router.get("/:id", [verifyToken], controller.getCourse);
router.post("/:id/class", [verifyToken, verifyAdmin], controller.addCourse);

module.exports = router;
