import listServices from "../services/listServices.js";
import { statusCodes } from "../core/common/constant.js";

const createList = async(req,res)=>{
    const data = await listServices.createList(req);
    res.status(statusCodes?.created).send(data);
}

const getListByUserId = async(req,res)=>{
    const data = await listServices.getListByUserId(req);
    res.status(statusCodes?.ok).send(data);
}

const updateList = async(req,res)=>{
    const data = await listServices.updateList(req);
    res.status(statusCodes?.ok).send(data);
}

export default {
    createList,
    getListByUserId,
    updateList
}