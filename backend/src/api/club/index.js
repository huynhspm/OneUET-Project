const Router = require("express");
const controller = require("./controller");

const { verifyToken, verifyAdmin } = require("../../middleware/service");

const router = Router();

router.post("/", [verifyToken, verifyAdmin], controller.createClub);
router.get("/", [verifyToken], controller.getClubs);

router.get("/:id", [verifyToken], controller.getClub);
router.put("/:id", [verifyToken, verifyAdmin], controller.updateClub);
router.delete("/:id", [verifyToken, verifyAdmin], controller.deleteClub);

module.exports = router;
