import * as express from "express";
import { CompanyAuthRoutes } from "./companyauth";
import { companyRouter } from "./company";
import { companyadminRouter } from "./companyadmin";

const router = express.Router();
router.use("/company/auth",CompanyAuthRoutes);
router.use("/company/",companyRouter);
router.use("/admin/company/",companyadminRouter);

export {router as IndexRouter};
