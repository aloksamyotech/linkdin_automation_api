import { Message, statusCodes } from "../core/common/constant.js";
import leadService from "../services/leadService.js";

const createLead = async(req,res)=>{
  const data = await leadService.createLead(req?.body);
  const io = req.app.get('socketio');

  io.emit('new_lead', { listId: data[0]?.listId, data });
  res.status(statusCodes?.created).send({message:Message?.created});
}

const getLeadData = async (req, res) => {
  const data = await leadService.getLeadData();
  res.status(statusCodes?.ok).send(data);
};

const getLeadById = async (req,res) => {
    const data = await leadService.getLeadById(req);
    res.status(statusCodes?.ok).send(data);
}

const getLeadByListId = async (req,res) => {
  const data = await leadService.getLeadDataByListId(req.param.id);
  res.status(statusCodes?.ok).send(data);
}

const getPaginatedLead = async (req,res)=>{
  const data = await leadService.getPaginatedLead(req);
  res.status(statusCodes?.ok).send(data);
}

export default {
    getLeadData,
    getLeadById,
    getLeadByListId,
    createLead,
    getPaginatedLead
}