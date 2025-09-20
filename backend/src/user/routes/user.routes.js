import express from "express";
import { createNewUser } from "../controller/user.controller.js";

const router = express.Router();

router.route("/register").post(createNewUser);

export default router;
