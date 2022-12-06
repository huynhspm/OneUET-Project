const Router = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getAllUsers);

router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);
router.get("/:id", controller.getUser);
router.post(":/id", controller.addUser);

module.exports = router;
