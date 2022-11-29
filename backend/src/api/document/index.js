const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createDocument);
router.get("/", controller.getAllDocuments);

router.get("/:id", controller.getDocumentById);
router.put("/:id", controller.updateDocument);
router.delete("/:id", controller.deleteDocument);

module.exports = router;
