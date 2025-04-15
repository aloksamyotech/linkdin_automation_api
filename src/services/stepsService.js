import { Message, statusCodes } from "../core/common/constant.js";
import { StepModel } from "../models/steps.js";

const createSteps = async(req)=>{
    const data = await StepModel.create(req?.body);
    return data;
}

const getStepsByCampaignId = async(req)=>{
    const data = await StepModel.find({campaignId: req?.params?.campaignId});
    return data;
}

const updateSteps = async(req)=>{
    const data = await StepModel.findOne({_id:req?.params?.id});
    if(!data){
       return {status:statusCodes?.noContent,message:Message?.noContent}
    }
    const updateData = await StepModel.findOneAndUpdate({_id:data?._id},{$set:req?.body},{new:true});
    return updateData;
}

const deleteSteps = async(req)=>{
    const data = await StepModel.findOne({_id:req?.params?.id});
    if(!data){
       return {status:statusCodes?.noContent,message:Message?.noContent}
    }
    const updateData = await StepModel.findOneAndUpdate({_id:data?._id},{$set:{isDeleted:true}},{new:true});
    return updateData;
}

export default {
    createSteps,
    getStepsByCampaignId,
    updateSteps,
    deleteSteps
}