export type JWTValidationError = {
  message: string;
};

export type DecodedJWT = {
  email: string;
  iat: number;
  exp: number;
};
