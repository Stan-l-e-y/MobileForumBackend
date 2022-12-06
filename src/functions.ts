import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './server.js';

export function validateAndDecodeJWT<T>(token?: string): T {
  if (!token) {
    throw { message: 'Missing token' };
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET!, { complete: true })
      .payload as T;

    const { exp } = payload as { exp: number };

    if (exp < Date.now() / 1000) {
      throw { message: 'Token expired' };
    }
    return payload;
  } catch (error) {
    throw { message: 'Invalid token' };
  }
}
