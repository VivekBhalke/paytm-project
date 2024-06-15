import express from "express";
const router = express.Router();

import authRouter from "./userRoutes.js";
import accountRouter from "./accountRoutes.js";
import meRouter from "./meRouter.js";


router.use("/user" , authRouter);
router.use("/account" , accountRouter);
router.use("/me" , meRouter)

export default router;