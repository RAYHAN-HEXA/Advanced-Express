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

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token!",
      });
    }
  };
};

export default auth;
