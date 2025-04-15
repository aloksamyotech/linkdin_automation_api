import { Router } from "express";
const router = Router();
import CampaignController from "../../controllers/campaignController.js";
import { asyncHandler } from "../../utils/asyncWrapper.js";

router.post('/createCampaign',asyncHandler(CampaignController.createCampaign));
router.get('/getCampaignById/:id',asyncHandler(CampaignController.getCampaignById));
router.get('/getCampaignByUserId/:userId',asyncHandler(CampaignController.getCampaignByUserId));
router.get('/getPaginatedCampaign/:userId',asyncHandler(CampaignController.getPaginatedData));
router.get('/getAllCampaign',asyncHandler(CampaignController.getAllCampaign));

export default router;