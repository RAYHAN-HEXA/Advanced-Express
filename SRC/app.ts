import express, { response, type Application, type Request, type Response }  from "express";
import config from "./Config";
import {  pool } from "./db";
import { userRouter } from "./modules/user.route";
import {  profileRouter } from "./modules/profile/profile.route";
import { authroute } from "./modules/auth/auth.route";
import fs from "fs";
import logger from "./midlleware/logger";
const app : Application = express()
const port =  config.port;
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}))
import cookieParse from "cookie-parser";
import cookieParser from "cookie-parser";
import cors from "cors"

app.use(logger);

app.use
 app.use(cookieParser());
 app.use("/api/users",userRouter)
 app.use("/api/profile",profileRouter)
 app.use("/api/auth",authroute)
app.use(cors())

export default app