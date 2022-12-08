const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();

router.post("/", [verifyToken], controller.createComment);

router.get("/me", [verifyToken], controller.getMyComments);
router.get("/me/:id", [verifyToken], controller.getMyComment);
router.put("/me/:id", [verifyToken], controller.updateMyComment);
router.delete("/me/:id", [verifyToken], controller.deleteMyComment);

router.get("/", [verifyToken, verifyAdmin], controller.getAllComments);
router.get("/:id", [verifyToken, verifyAdmin], controller.getComment);
router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteComment);

module.exports = router;
