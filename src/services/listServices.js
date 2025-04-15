import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import { Encrypter } from "../core/common/helper.js";
import ScrappingService from "../external/ScrappingService.js";
import { ListModel } from "../models/list.js";
import CustomError from "../utils/exception.js";
import linkedinServices from "./linkedinServices.js";

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
    const linkedinUser = await linkedinServices.getLinkedinAccountById(req?.body?.linkedInId);
    console.log("linkedinUser : ",linkedinUser);
    const password = await Encrypter.decrypt(linkedinUser?.password);
    const user={
        username: linkedinUser?.email,
        password:password
    };
    const response = await ScrappingService.scrappLead({user,listData,url:req?.body?.url});
    console.log("response : ",response);
    return listData;
}

const getListByUserId = async(req) => {
    const data = await ListModel.find({userId:req?.params?.userId,isDeleted:false});
    return data;
}

const updateList = async(req)=>{
    const data = await ListModel.findOneAndUpdate(
        {_id:req.params.id},
        { $set:{ ...req.body } },
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
        { $set:{leadCount:data?.totalLead} },
        { new:true }
    );
    return updateList;
}

const getPaginatedList = async (req) => {
    const { id, page = 1, limit = 10, search, type } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
  
    const matchCondition = {
      createdBy: id,
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
            createdBy:id,
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
    getPaginatedList
}