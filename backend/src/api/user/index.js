const Router = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getUsers);
router.put("/", controller.updateUser);
router.delete("/", controller.deleteUser);

module.exports = router;
