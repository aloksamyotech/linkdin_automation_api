import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import { ListModel } from "../models/list.js";
import CustomError from "../utils/exception.js";

const createList = async(req)=>{
    const data = await ListModel.create(req?.body);
    return data;
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

export default {
    createList,
    getListByUserId,
    updateList
}