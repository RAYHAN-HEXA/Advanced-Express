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
    try {
      // 1. Check token
      const token = req.headers.authorization;
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

      // 3. Find user into database
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
      if(!user.is_active){
        return res.status(403).json({
          message: "Forbidden access!",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token!",
      });
    }
  };
};

export default auth;
