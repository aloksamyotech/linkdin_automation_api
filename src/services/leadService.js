import { LeadModel } from "../models/lead.js";

const createLead = async (leaddata)=>{
    const data = await LeadModel.inserMany(leaddata);
    return data;
}

const getLeadData = async () => {
    const data = await LeadAccount.find({}, { row: 0 });
    return data;
  };

const getLeadDataByListId = async () => {
  const data = await LeadAccount.find({listId:req?.params?.listId}, { row: 0 });
  return data;
};

const getLeadById = async ()=>{
    const data = await LeadAccount.findOme({_id:req?.params?.id},{ row:0 });
    return data;
}


export default {
    createLead,
    getLeadDataByListId,
    getLeadById,
    getLeadData,
}