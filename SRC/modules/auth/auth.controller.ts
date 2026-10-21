
import type { Request, Response } from "express";
import { authService } from "./auth.service";

// Login: email and password দিয়ে login করবে
const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);

    const { accessToken, refreshToken } = result;

    // Refresh token cookie-তে save হবে
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { accessToken },
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Refresh token cookie দিয়ে নতুন access token তৈরি করবে
const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;

    const result = await authService.generateFreshToken(token);

    res.status(200).json({
      success: true,
      message: "Access token generated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  loginUser,
  refreshToken,
};
