const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createTeacher);
router.get("/", controller.getAllTeachers);

router.put("/:id", controller.updateTeacher);
router.delete("/:id", controller.deleteTeacher);
router.get("/:id", controller.getTeacher);
router.post("/:id", controller.addTeacher);
module.exports = router;
