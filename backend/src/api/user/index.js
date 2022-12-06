const Router = require("express");
const controller = require("./controller");

const {
	verifyToken,
	verifyUser,
	verifyAdmin,
} = require("../../middleware/service");

const router = Router();

router.get("/", controller.getAllUsers);

router.get("/me", controller.getUser);
router.put("/me", controller.updateUser);

router.delete("/:id", controller.deleteUser);
router.post(":/id", controller.addUser);

module.exports = router;
