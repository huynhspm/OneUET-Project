const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createTeacher);
router.get("/", controller.getTeachers);
router.put("/", controller.updateTeacher);
router.delete("/", controller.deleteTeacher);

module.exports = router;
