const Router = require("express");
const controller = require("./controller");

const router = Router();
router.post("/", controller.createStudent);
router.get("/", controller.getAllStudents);

router.get("/:id", controller.getStudentById);
router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.deleteStudent);
router.get("/:id/class", controller.getAllClasses);

module.exports = router;
