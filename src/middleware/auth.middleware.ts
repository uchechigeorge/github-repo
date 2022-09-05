import { NextFunction, Request, Response } from "express";
/**
 * Middleware for authentication
 */

const authenticate = (req: Request, res: Response, next: NextFunction) => {

  const token = process.env.ACCESS_TOKEN;
  if(req.headers['authorization'] != token) {
    res.status(401).json({message: 'Unauthorized'});
    return;
  }
  
  next();
}

export default authenticate;