import express from "express";
import {
  createNewUser,
  getUserDetails,
  userLogin,
} from "../controller/user.controller.js";
import { isAuthenticated } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(createNewUser);
router.route("/login").post(userLogin);
router.route("/me").get((req, res)=>{
    console.log("ME")
}, isAuthenticated, getUserDetails);

export default router;
