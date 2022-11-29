const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createFile);
router.get("/", controller.getAllFiles);

router.get("/:id", controller.getFileById);
router.put("/:id", controller.updateFile);
router.delete("/:id", controller.deleteFile);

module.exports = router;
