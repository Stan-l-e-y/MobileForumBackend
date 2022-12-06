import { validateAndDecodeJWT } from '../functions.js';
import { DecodedJWT } from '../types.js';
import { NextFunction } from 'express';
import { Request, Response } from 'express';

export const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.JWT;
    const { email } = validateAndDecodeJWT<DecodedJWT>(token);
    next();
  } catch (error: any) {
    res.clearCookie('JWT').status(400).send(error.message).redirect('/login');
    // return res.redirect('/login');
  }
};
