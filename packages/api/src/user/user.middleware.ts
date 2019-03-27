import * as express from "express";
import * as jwt from "express-jwt";
import * as jwks from "jwks-rsa";

export function applyAuthMiddleware(app: express.Express) {
  /** Used to silent false alarms */
  const authErrorHandler: express.ErrorRequestHandler = (
    error,
    req,
    res,
    next
  ) => {
    // TODO: implement better error handling https://github.com/auth0/express-jwt#error-handling
    next();
  };

  app.use(
    jwt({
      secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTH0_JWKS_URI!
      }),
      credentialsRequired: false,
      audience: process.env.AUTH0_AUDIENCE!,
      issuer: process.env.AUTH0_ISSUER!,
      algorithms: ["RS256"]
    }),
    authErrorHandler
  );
}
