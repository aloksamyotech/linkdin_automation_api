import { Message, statusCodes } from "../core/common/constant.js";
import leadService from "../services/leadService.js";

const filterLinkedinAccounts = async (req, res) => {
  const data = await leadService.filterLinkedInAccount(
    req?.body?.url
  );
  res.status(statusCodes?.created).send(data);
};

const getLeadData = async (req, res) => {
  const data = await leadService.getLeadData();
  res.status(statusCodes?.ok).send(data);
};

const getLeadById = async (req,res) => {
    const data = await leadService.getLeadById(req);
    res.status(statusCodes?.ok).send(data);
}

const getLeadByListId = async (req,res) => {
    const data = await leadService.getLeadDataByListId(req);
    res.status(statusCodes?.ok).send(data);
}

const createLead = async(req,res)=>{
    const data = await leadService.createLead(req?.body);
    res.status(statusCodes?.created).send({data,message:Message?.created});
}

const sendConnection = async (req, res) => {
  const data = await leadService.sendConnectionRequest(
    req?.body?.leadId
  );
  res.status(statusCodes?.ok).send(data);
};

export default {
    filterLinkedinAccounts,
    getLeadData,
    getLeadById,
    getLeadByListId,
    createLead,
    sendConnection
}