import { NextFunction, Request, Response } from "express";
/**
 * Middleware for authentication
 */

const authenticate = (req: Request, res: Response, next: NextFunction) => {

  const token = process.env.ACCESS_TOKEN;

  if(req.header('Authorization') != token) {
    res.status(401).json({message: 'Invalid authorization token'});
    return;
  }
  
  next();
}

export default authenticate;