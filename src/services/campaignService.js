import { CampaignModel } from "../models/campaign";

const createCampaign = async(req)=>{
    const data = await CampaignModel.create(req.body);
    return data;
}

export default {
    createCampaign
}