import type { NextFunction, Request, Response } from "express";

const logger = (req: Request, res:Response, next:NextFunction) => {
  console.log('Method - Url - Time:',req.method ,req.url, Date.now());
  next();
}

export default logger;
