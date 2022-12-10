const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();
router.post("/", [verifyToken, verifyAdmin], controller.createClass);

router.get("/me", [verifyToken], controller.getMyClasses);
router.get("/me/studied", [verifyToken], controller.getMyStudiedClasses);
router.get("/me/studying", [verifyToken], controller.getMyStudyingClasses);
router.get("/me/:id", [verifyToken], controller.getMyClass);

router.get("/", [verifyToken, verifyAdmin], controller.getClasses);
router.get("/:id", [verifyToken, verifyAdmin], controller.getClass);
router.put("/:id", [verifyToken, verifyAdmin], controller.updateClass);
router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteClass);

module.exports = router;
