"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
function applyAuthMiddleware(app) {
    /** Used to silent false alarms */
    const authErrorHandler = (error, req, res, next) => {
        // TODO: implement better error handling https://github.com/auth0/express-jwt#error-handling
        next();
    };
    app.use(jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: process.env.AUTH0_JWKS_URI
        }),
        credentialsRequired: false,
        audience: process.env.AUTH0_AUDIENCE,
        issuer: process.env.AUTH0_ISSUER,
        algorithms: ["RS256"]
    }), authErrorHandler);
}
exports.applyAuthMiddleware = applyAuthMiddleware;
