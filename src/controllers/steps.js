import { statusCodes } from "../core/common/constant.js";
import StepsService from "../services/stepsService.js";

const createStep = async (req,res)=>{
    const data = await StepsService.createSteps(req);
    res.status(statusCodes?.created).send(data);
}

const getStepsByCampaignId = async (req,res)=>{
    const data = await StepsService.getStepsByCampaignId(req);
    res.status(statusCodes?.ok).send(data);
}

const updateSteps = async (req,res)=>{
    const data = await StepsService.updateSteps(req);
    res.status(statusCodes?.ok).send(data);
}

const deleteSteps = async(req,res)=>{
    const data = await StepsService.deleteSteps(req);
    res.status(statusCodes?.ok).send(data);
}
export default {
    createStep,
    getStepsByCampaignId,
    updateSteps,
    deleteSteps
}