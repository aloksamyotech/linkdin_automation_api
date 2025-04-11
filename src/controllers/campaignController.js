import { statusCodes } from "../core/common/constant";
import CampaignService from "../services/campaignService";

const createCampaign = async (req,res)=>{
    const campaign = await CampaignService.createCampaign(req);
    res.status(statusCodes?.created).send(campaign);
}

export default {
    createCampaign
}