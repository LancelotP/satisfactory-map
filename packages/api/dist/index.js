"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const throng = require("throng");
const server_1 = require("./server");
const WORKERS = parseInt(process.env.WEB_CONCURRENCY || "1");
throng(WORKERS, server_1.start);
