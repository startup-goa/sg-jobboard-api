import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;

const devKey = "";
let jwtKeyPublic = "";
let jwtKeyPrivate = "";
// PRIVATE and PUBLIC key
import path = require("path");
const appDir = path.dirname(require.main.filename);
jwtKeyPrivate  = fs.readFileSync(path.join(appDir,"../private.key"), "utf8");
jwtKeyPublic  = fs.readFileSync(path.join(appDir,"../public.key"), "utf8");

export {jwtKeyPrivate,jwtKeyPublic};