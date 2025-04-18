import mongoose from "mongoose";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import { ListModel } from "../models/list.js";
import CustomError from "../utils/exception.js";

const createList = async(req)=>{
    const listData = await ListModel.create({
        name:req?.body?.name,
        type:req?.body?.type,
        linkedInId:req?.body?.linkedInId,
        createdBy:req?.body?.userId
    });
    if(!listData){
        throw new CustomError(
            statusCodes?.internalServerError,
            Message?.internalServerError,
            errorCodes?.internal_error 
        );
    }
    return listData;
}

const getListByUserId = async(req) => {
    const data = await ListModel.find({userId:req?.params?.userId,isDeleted:false});
    return data;
}

const getListById = async(id)=>{    
    const data = await ListModel.aggregate([
        {
            $match:{_id: new mongoose.Types.ObjectId(id)}
        },
        {
            $lookup:{
                from: 'linkedinaccounts',
                localField: 'linkedInId',     
                foreignField: '_id',
                as: 'LinkedinData',
            }
        }
    ]);
    if(data?.length === 0){
        return {status: statusCodes?.noContent,message:Message?.noContent}
    }
    return data;
}

const updateList = async(req)=>{
    const data = await ListModel.findOneAndUpdate(
        { _id:req.params.id },
        { $set:{ name:req.body.name } },
        { new:true }
    );
    if(!data){
       throw new CustomError(
        statusCodes.notFound,
        Message.notFound,
        errorCodes.not_found
       )
    }
    return data;
}

const updateCount = async(data)=>{
    const updateList = await ListModel.findOneAndUpdate(
        { _id:data?.id },
        { $set:{leadCount:data?.totalLeadCount} },
        { new:true }
    );
    return updateList;
}

const getPaginatedList = async (req) => {
    const { userId, page = 1, limit = 10, search, type } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
  
    const matchCondition = {
      createdBy: new mongoose.Types.ObjectId(userId),
      isDeleted: false,
    };
  
    if (search) {
      matchCondition.$or = [
        { name: { $regex: search, $options: 'i' } },
        { leadCount: search }
      ];
    }
  
    if (type) {
      matchCondition.type = type;
    }

    const [ data,totalCount ] = await Promise.all([
        ListModel.aggregate([
            { $match: matchCondition },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]),
        ListModel.countDocuments({
            createdBy:userId,
            isDeleted:false
        })
    ]);    
  
    return {data,totalCount};
};
  
export default {
    createList,
    getListByUserId,
    updateList,
    updateCount,
    getPaginatedList,
    getListById
}