const Router = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getAllUsers);

router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

router.get("/:id/class", controller.getAllClasses);
router.get("/:id/document", controller.getAllDocuments);

module.exports = router;
