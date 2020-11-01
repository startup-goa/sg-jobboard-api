import * as express from "express";
import { AuthRoutes } from "./auth";

const router = express.Router();
router.use("/company/auth",AuthRoutes);

export {router as IndexRouter};
