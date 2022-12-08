const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();

router.get("/me", [verifyToken], controller.getMyUser);
router.put("/me", [verifyToken], controller.updateMyUser);

router.get("/", [verifyToken, verifyAdmin], controller.getUsers);
router.get("/:id", [verifyToken, verifyAdmin], controller.getUser);
router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteUser);
module.exports = router;
