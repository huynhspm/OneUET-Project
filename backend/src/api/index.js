const Router = require("express");
const loginRouter = require("./login");
const registerRouter = require("./register");
const userRouter = require("./user");
const classRouter = require("./class");
const teacherRouter = require("./teacher");
const documentRouter = require("./document");
const fileRouter = require("./file");
const courseRouter = require("./course");

const router = Router();

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/user", userRouter);
router.use("/class", classRouter);
router.use("/teacher", teacherRouter);
router.use("/document", documentRouter);
router.use("/file", fileRouter);
router.use("/course", courseRouter);
router.use("/", (req, res) => {
	res.json("Home");
});

module.exports = router;
