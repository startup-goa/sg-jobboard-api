import * as express from "express";
import { AuthRoutes } from "./auth";
import { companyRouter } from "./company";
import { companyadminRouter } from "./companyadmin";

const router = express.Router();
router.use("/company/auth",AuthRoutes);
router.use("/company/logo",AuthRoutes);
router.use("/company/",companyRouter);
router.use("/admin/company/",companyadminRouter);

export {router as IndexRouter};
