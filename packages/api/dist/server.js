"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const http_1 = require("http");
const apollo_1 = require("./apollo");
const typeorm_1 = require("typeorm");
const user_middleware_1 = require("./user/user.middleware");
const PORT = parseInt(process.env.PORT || "4000");
async function start() {
    console.time("server_startup");
    const app = express();
    const server = http_1.createServer(app);
    await typeorm_1.createConnection({
        type: "postgres",
        entities: [`${__dirname}/**/*.model.*s`],
        synchronize: true
    });
    user_middleware_1.applyAuthMiddleware(app);
    apollo_1.applyApolloMiddleware(app);
    await new Promise(r => server.listen(PORT, r));
    console.timeEnd("server_startup");
}
exports.start = start;
