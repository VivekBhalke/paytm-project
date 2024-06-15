import express from "express";
import tokenVerify from "../middlewares/tokenVerify.js";
import getBalance from "../controllers/account/getBalance.js";
import transferMoney from "../controllers/account/transferMoney.js";

const router = express.Router();


router.get("/balance",tokenVerify, getBalance);

router.post("/transfer" , tokenVerify , transferMoney);

export default router;