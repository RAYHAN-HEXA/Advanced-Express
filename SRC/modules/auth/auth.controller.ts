
import type { Request, Response } from "express";
import { authService } from "./auth.service";

// Login: email and password দিয়ে login করবে
const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);

    const { accessToken, refreshToken } = result;

    export const authController = {
  loginUser
};
