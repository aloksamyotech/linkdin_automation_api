import { statusCodes } from "../core/common/constant.js";
import ActionService from "../services/actionService.js"

const createAction = async(req,res)=>{
    const data = await ActionService.createAction(req);
    res.status(statusCodes?.created).send(data);
}

const getActionData = async(req,res)=>{
    const data = await ActionService.getActionData();
    res.status(statusCodes?.ok).send(data);
}

const updateAction = async(req,res)=>{
    const data = await ActionService.updateAction(req);
    res.status(statusCodes?.ok).send(data);
}

const deleteAction = async(req,res)=>{
    const data = await ActionService.deleteAction(req);
    res.status(statusCodes?.ok).send(data);
}

export default {
    createAction,
    getActionData,
    updateAction,
    deleteAction
}