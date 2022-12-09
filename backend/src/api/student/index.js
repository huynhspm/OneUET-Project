const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();
router.post("/", [verifyToken, verifyAdmin], controller.createStudent);
router.get("/", [verifyToken, verifyAdmin], controller.getStudents);
router.get("/:id", [verifyToken, verifyAdmin], controller.getStudent);
router.put("/:id", [verifyToken, verifyAdmin], controller.updateStudent);
router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteStudent);

module.exports = router;
