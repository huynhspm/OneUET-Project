import { Router } from "express";
import loginRouter from "./login/index.js";

const router = Router();

router.use("/", (req, res) => {
	res.send("HELLO I'M SPM");
});

router.use("/login", loginRouter);

export default router;
