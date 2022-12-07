const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();
router.post("/", [verifyToken, verifyAdmin], controller.createStudent);
router.get("/", [verifyToken], controller.getAllStudents);

router.put("/:id", [verifyToken, verifyAdmin], controller.updateStudent);
router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteStudent);
router.get("/:id", [verifyToken],controller.getStudent);
router.post("/:id", [verifyToken, verifyAdmin], controller.addStudent);

module.exports = router;
