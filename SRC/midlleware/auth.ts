
import type { NextFunction, Request, Response } from "express";
import Jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../Config";
import { pool } from "../db";
import type { ROLES } from "../types";
 

 
const auth = (...roles : ROLES[]) => {

  return async (
    
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
      console.log(roles);
    try {
 //1.if the token exists (Universal)

//2.verify the token

//3.Find the user into database 

//4. if the user active or not
      const token = req.headers.authorization;

      // 1. Check token
      if (!token) {
        return res.status(401).json({
          message: "Unauthorized access!",
        });
      }

      // 2. Verify token
      const decoded = Jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;

      // 3. Find user from database
      const userData = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [decoded.email]
      );

      // 4. Check user existence
      if (userData.rows.length === 0) {
        return res.status(401).json({
          message: "Unauthorized access!",
        });
      }

      // 5. Get user
      const user = userData.rows[0];

      console.log(user);
      if(!user.is_active){
   return res.status(403).json({
          message: "Forbidden access!",
        });
}
//roles  = ["admin",'agent'];
//user.role = "admin"|"agent"|"user"
console.log("Auth Role",user.role)
if(roles.length && !roles.includes(user.role)){
  return res.status(403).json({
          message: "Forbidden access!",
        });
}
req.user = decoded // req: {user :{}}

      // 6. Continue to the next middleware/controller
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token!",
      });
    }
  };
};

export default auth;
