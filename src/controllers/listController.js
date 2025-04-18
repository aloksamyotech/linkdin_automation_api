import listServices from "../services/listServices.js";
import { statusCodes } from "../core/common/constant.js";
import linkedinServices from "../services/linkedinServices.js";
import { Encrypter } from "../core/common/helper.js";
import ScrappingService from "../external/ScrappingService.js";

const createList = async(req,res)=>{
    const data = await listServices.createList(req);
    res.status(statusCodes?.created).send(data);
    const linkedinUser = await linkedinServices.getLinkedinAccountById(req?.body?.linkedInId);
    const password = await Encrypter.decrypt(linkedinUser?.password);
    const user={
        username: linkedinUser?.email,
        password:password
    };
    const response = await ScrappingService.scrappLead({user,data,url:req?.body?.url});
}

const getListByUserId = async(req,res)=>{
    const data = await listServices.getListByUserId(req);
    res.status(statusCodes?.ok).send(data);
}

const getListById = async(req,res)=>{
    const data = await listServices.getListById(req.params.id);
    res.status(statusCodes?.ok).send(data);
}

const updateList = async(req,res)=>{
    const data = await listServices.updateList(req);
    res.status(statusCodes?.ok).send(data);
}

const getPaginatedData = async(req,res)=>{
    const data = await listServices.getPaginatedList(req);
    res.status(statusCodes?.ok).send(data);
}

export default {
    createList,
    getListByUserId,
    updateList,
    getPaginatedData,
    getListById
}