import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import { ActionModel } from "../models/action.js";
import CustomError from "../utils/exception.js";

const createAction = async(req)=>{
    const data = await ActionModel.create(req?.body);
    if(!data){
        throw CustomError(statusCodes?.internalServerError,Message?.serverError,errorCodes?.server_error)
    }
    return data;
}

const getActionData = async()=>{
    const data = await ActionModel.find({isDeleted:false});
    if(data?.length === 0){
      return {
        status: statusCodes?.noContent,
        message: Message?.noContent,
      }
    }
    return data;
}

const updateAction = async(req)=>{
    const data = await ActionModel.findOneAndUpdate(
        { _id: req?.params.id },
        { $set:{...req?.body} },
        { new:true, runValidators: true }
    );
    if(!data){
        return {status: statusCodes?.noContent,message:Message?.noContent};
    }
    return data;
}

const deleteAction = async(req)=>{
    const data = await ActionModel.findOneAndUpdate(
        { _id: req?.params.id },
        { $set:{isDeleted:true} },
        { new:true, runValidators: true }
    );
    if(!data){
        return {status: statusCodes?.noContent,message:Message?.noContent};
    }
    return data;
}

export default{
    createAction,
    getActionData,
    updateAction,
    deleteAction
}