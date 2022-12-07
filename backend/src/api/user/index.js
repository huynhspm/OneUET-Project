const Router = require("express");
const controller = require("./controller");

const {
	verifyToken,
	verifyUser,
	verifyAdmin,
} = require("../../middleware/service");

const router = Router();

router.get("/", [verifyToken, verifyAdmin], controller.getAllUsers);

router.get("/me", [verifyToken], controller.getMyUser);
router.put("/me", [verifyToken], controller.updateMyUser);

router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteUser);
router.get("/:id", [verifyToken, verifyAdmin], controller.getUser);
router.post(":/id", [verifyToken, verifyAdmin], controller.addUser);

module.exports = router;
