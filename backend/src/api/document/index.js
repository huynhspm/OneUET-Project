const Router = require("express");
const controller = require("./controller");

const {
	verifyToken,
	verifyAdmin,
} = require("../../middleware/service");

const router = Router();

router.post("/", controller.createDocument);
router.get("/", controller.getPublicDocuments);
router.get("/me", [verifyToken], controller.getMyDocuments);

router.put("/me/:id", [verifyToken], controller.updateMyDocument);
router.delete("/me/:id", [verifyToken], controller.deleteMyDocument);
router.get("/me/:id", [verifyToken], controller.getMyDocument);

router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteDocument);
router.get("/:id", [verifyToken, verifyAdmin], controller.getDocument);

module.exports = router;
