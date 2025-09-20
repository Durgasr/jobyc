import express from "express";
import dotenv from "dotenv"
import userRoutes from "./src/user/routes/user.routes.js";
import cookieParser from "cookie-parser";
import path from "path"



const configPath = path.resolve("config", ".env")
dotenv.config({path: configPath})

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/jobyc/user", userRoutes);

export default app;
