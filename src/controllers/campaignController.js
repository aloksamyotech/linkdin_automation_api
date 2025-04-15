import { statusCodes } from "../core/common/constant.js";
import CampaignService from "../services/campaignService.js";

const createCampaign = async (req,res)=>{
    console.log("req?.body : ",req?.body);
    const campaign = await CampaignService.createCampaign(req);
    res.status(statusCodes?.created).send(campaign);
}

const getCampaignById = async(req,res)=>{
    const data = await CampaignService.getCampaignById(req);
    res.status(statusCodes?.ok).send(data);
}

const getCampaignByUserId = async(req,res)=>{
    const data = await CampaignService.getCampaignByUserId(req);
    res.status(statusCodes?.ok).send(data);
}

const getPaginatedData = async(req,res)=>{
    const data = await CampaignService.getPaginatedCampaignData(req);
    res.status(statusCodes?.ok).send(data);
}

const getAllCampaign = async(req,res)=>{
    const data = await CampaignService.getAllCampaign();
    res.status(statusCodes?.ok).send(data);
}

const updateCampaign = async(req,res)=>{
    const data = await CampaignService.updateCampaign(req);
    res.status(statusCodes?.ok).send(data);
}

export default {
    createCampaign,
    getCampaignById,
    getCampaignByUserId,
    getPaginatedData,
    getAllCampaign,
    updateCampaign
}