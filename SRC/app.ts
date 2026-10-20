import express, { response, type Application, type Request, type Response }  from "express";
import config from "./Config";
import {  pool } from "./db";
import { userRouter } from "./modules/user.route";
import {  profileRouter } from "./modules/profile/profile.route";
import { authroute } from "./modules/auth/auth.route";
const app : Application = express()
const port =  config.port;
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}))




 app.use("/api/users",userRouter)
 app.use("/api/profile",profileRouter)
 app.use("/api/auth",authroute)


export default app