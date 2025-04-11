import { Router } from "express";
import LeadController from "../../controllers/leadController.js";
import { asyncHandler } from "../../utils/asyncWrapper.js";
const router = Router();

router.post("/creatLead",asyncHandler(LeadController.createLead));
router.get("/getLead",asyncHandler(LeadController.getLeadData));
router.get('/getLeadByListid/:id',asyncHandler(LeadController.getLeadByListId));
router.get('/getLeadById/:id',asyncHandler(LeadController?.getLeadById));

export default router;