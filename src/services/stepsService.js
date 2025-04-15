import { StepModel } from "../models/steps.js";

const createSteps = async(req)=>{
    const data = await StepModel.create(req?.body);
    return data;
}

const getStepsByCampaignId = async(req)=>{
    const data = await StepModel.find({campaignId: req?.params?.campaignId});
    return data;
}

export default {
    createSteps,
    getStepsByCampaignId
}