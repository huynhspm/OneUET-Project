const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createDocument);
router.get("/", controller.getAllDocuments);

router.put("/:id", controller.updateDocument);
router.delete("/:id", controller.deleteDocument);
router.get("/:id", controller.getDocument);

module.exports = router;
