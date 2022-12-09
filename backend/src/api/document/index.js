const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();

router.post("/", [verifyToken], controller.createDocument);

router.get("/public", [verifyToken], controller.getPublicDocuments);
router.get("/public/:id", [verifyToken], controller.getPublicDocument);

router.get("/me", [verifyToken], controller.getMyDocuments);
router.get("/me/:id", [verifyToken], controller.getMyDocument);
router.put("/me/:id", [verifyToken], controller.updateMyDocument);
router.delete("/me/:id", [verifyToken], controller.deleteMyDocument);

router.get("/", [verifyToken, verifyAdmin], controller.getDocuments);
router.get("/:id", [verifyToken, verifyAdmin], controller.getDocument);
router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteDocument);

module.exports = router;
