const Router = require("express");
const { login, verify } = require("./controller");

const router = Router();

router.post("/", login);
router.post("/verify", verify);

module.exports = router;
