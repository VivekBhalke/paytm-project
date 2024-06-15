import express from "express";
const router = express.Router();
import zodVerify from "../middlewares/zodVerify.js";
import loginController from "../controllers/users/loginController.js";
import signupController from "../controllers/users/singupController.js";
import tokenVerify from "../middlewares/tokenVerify.js";
import updateUser from "../controllers/users/updateUser.js";
import zodVerifyTotal from "../middlewares/zodVerifyTotal.js";
import getAllUsers from "../controllers/users/getAllUsers.js";


router.post("/login" , zodVerify , loginController);

router.post("/signup",zodVerify,signupController);

router.put("/update" , zodVerifyTotal ,tokenVerify , updateUser);

router.get("/bulk" , tokenVerify , getAllUsers);

export default router;