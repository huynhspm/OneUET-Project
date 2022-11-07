const Router = require("express");
const { register } = require("./controller");

const router = Router();

router.post("/", register);

module.exports = router;
