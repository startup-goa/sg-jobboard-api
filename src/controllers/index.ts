import * as express from "express";
import { AuthRoutes } from "./auth";

const router = express.Router();
router.use("/login",AuthRoutes);

export {router as IndexRouter};
