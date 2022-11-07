const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createFile);
router.get("/", controller.getFiles);
router.put("/", controller.updateFile);
router.delete("/", controller.deleteFile);

module.exports = router;
