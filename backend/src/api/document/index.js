const Router = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createDocument);
router.get("/", controller.getDocuments);
router.put("/", controller.updateDocument);
router.delete("/", controller.deleteDocument);

module.exports = router;
