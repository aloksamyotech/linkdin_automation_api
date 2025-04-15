import { Router } from "express";
import { asyncHandler } from "../../utils/asyncWrapper.js";
import StepsController from '../../controllers/steps.js';
const router = Router();

router.post('/createSteps',asyncHandler(StepsController.createStep));
router.get('/getStepByCampaignId/:id',asyncHandler(StepsController.getStepsByCampaignId));

export default router;