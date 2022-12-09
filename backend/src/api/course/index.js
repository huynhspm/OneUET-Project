const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();

router.post("/", [verifyToken, verifyAdmin], controller.createCourse);
router.get("/", [verifyToken, verifyAdmin], controller.getCourses);
router.get("/:id", [verifyToken, verifyAdmin], controller.getCourse);
router.put("/:id", [verifyToken, verifyAdmin], controller.updateCourse);
router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteCourse);

module.exports = router;
