import { Request, Response, NextFunction } from "express";
export const authorizedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const api_key = req?.headers["x-api-key"];

  console.log(api_key, "req header");
  if (api_key !== "fms") {
    return res.status(401).json({ error: "Unauthorized Access Denied 😐" });
  }
  next();
};
