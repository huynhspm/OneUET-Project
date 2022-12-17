const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();

router.post("/", [verifyToken], controller.createComment);
router.get("/", [verifyToken, verifyAdmin], controller.getAllComments);

router.put("/me/:id", [verifyToken], controller.updateMyComment);
router.delete("/me/:id", [verifyToken], controller.deleteMyComment);
router.get("/:id", [verifyToken], controller.getComment);

router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteComment);

module.exports = router;
