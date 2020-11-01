import * as express from "express";
import { AuthRoutes } from "./auth";

const router = express.Router();
router.use("/company/auth",AuthRoutes);
router.use("/company/logo",AuthRoutes);

export {router as IndexRouter};
