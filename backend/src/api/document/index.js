const Router = require("express");
const controller = require("./controller");

const {
	verifyToken,
	verifyUser,
	verifyAdmin,
} = require("../../middleware/service");

const router = Router();

router.post("/", controller.createDocument);
router.get("/", controller.getPublicDocuments);
router.get("/me", [verifyToken], controller.getMyDocuments);

router.put("/me/:id", controller.updateDocument);

// router.delete("/me/:id", controller.deleteMyDocument);
// router.get("/me/:id", controller.getMyDocument);

router.delete("/:id", controller.deleteDocument);
router.get("/:id", controller.getDocument);

module.exports = router;
