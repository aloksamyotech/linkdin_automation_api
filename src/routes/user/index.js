import { Router } from "express";
import linkedInRoute from "./linkedinAccount.js";
import listRoute from "./list.js";
import leadRoute from "./lead.js";
import authRoute from "./user.js";
import actionRoute from "./action.js"

const router = Router();

router.use('/linkedInAccount',linkedInRoute);
router.use("/list",listRoute);
router.use("/lead",leadRoute);
router.use("/auth",authRoute);
router.use("/action",actionRoute);

export default router;