const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createClass);
router.get("/", controller.getClasses);
router.put("/", controller.updateClass);
router.delete("/", controller.deleteClass);

module.exports = router;
