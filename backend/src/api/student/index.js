const Router = require("express");
const controller = require("./controller");

const {
	verifyToken,
	verifyUser,
	verifyAdmin,
} = require("../../middleware/service");

const router = Router();
router.post("/", controller.createStudent);
router.get("/", controller.getAllStudents);

router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.deleteStudent);
router.get("/:id", controller.getStudent);
router.post("/:id", controller.addStudent);

module.exports = router;
