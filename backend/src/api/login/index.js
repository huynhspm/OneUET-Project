import Router from "express";
import { login } from "./controller.js";

const router = Router();
router.use("/", login);

export default router;
