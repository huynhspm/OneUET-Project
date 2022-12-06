const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createFile);
router.get("/", controller.getAllFiles);

router.put("/:id", controller.updateFile);
router.delete("/:id", controller.deleteFile);
router.get("/:id", controller.getFile);

module.exports = router;
