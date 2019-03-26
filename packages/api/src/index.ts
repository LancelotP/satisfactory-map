import * as throng from "throng";
import { start } from "./server";

const WORKERS = parseInt(process.env.WEB_CONCURRENCY || "1");

throng(WORKERS, start);
