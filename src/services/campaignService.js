import mongoose from "mongoose";
import { CampaignModel } from "../models/campaign.js";
import { Message, statusCodes } from "../core/common/constant.js";

const createCampaign = async(req)=>{
    const data = await CampaignModel.create(req.body);
    return data;
}

const getAllCampaign = async()=>{
    const data = await CampaignModel.find({isDeleted:false});
    return data;
}

const getCampaignById = async(req)=>{
    const data = await CampaignModel.findOne({_id:req.params.id,isDeleted:false});
    return data;
}

const getCampaignByUserId = async(req)=>{
    const data = await CampaignModel.find({createdBy:req.params.userId,isDeleted:false});
    return data;
}

const getPaginatedCampaignData = async(req)=>{
  const { userId, page = 1, limit = 10, status, search, sender } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const matchCondition = {
    createdBy: userId,
    isDeleted: false,
  };
  if(search){
    matchCondition.$or = [
        {name: { $regex: search, $options: 'i' }},
    ]
  }
  if(status){
    matchCondition.status = status;
  }
  if(sender){
    matchCondition.linkedInId = new mongoose.Types.ObjectId(sender);
  }
  
  const [data, totalCount] = await Promise.all([
    CampaignModel.aggregate(
        { $match:matchCondition },
        { $skip:skip },
        { $limit:parseInt(limit) }
    ),
    CampaignModel.countDocuments({ createdBy: new mongoose.Types.ObjectId(userId), isDeleted:false })
    ]);

  return {data,totalCount};
}

const getCampaignCount = async(id)=>{
   const totalCount = await CampaignModel.countDocuments({listId:id,isDeleted:false});
   return totalCount;
}

const updateCampaign = async(req)=>{
  const data = await CampaignModel.findOne({_id:req?.params?.id});
  if(!data){
    return {status:statusCodes?.notFound,message:Message?.notFound};
  }
  const updateCampaign = await CampaignModel.findOneAndUpdate(
    { _id:req?.params?.id },
    { $set:req.body },
    { new:true }
  );
  return updateCampaign;
}

export default {
    createCampaign,
    getCampaignById,
    getCampaignByUserId,
    getPaginatedCampaignData,
    getAllCampaign,
    getCampaignCount,
    updateCampaign
}