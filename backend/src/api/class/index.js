const Router = require("express");
const controller = require("./controller");

const {
	verifyToken,
	verifyUser,
	verifyAdmin,
} = require("../../middleware/service");

const router = Router();

router.post("/", controller.createClass);
router.get("/", controller.getAllClasses);

router.put("/:id", controller.updateClass);
router.delete("/:id", controller.deleteClass);
router.get("/:id", controller.getClass);
router.post("/:id", controller.addClass);

module.exports = router;
