import { LeadModel } from "../models/lead.js";
import listServices from "./listServices.js";

const createLead = async (leaddata)=>{
    console.log("leadData : ",leaddata);
    const data = await LeadModel.insertMany(leaddata);
    const totalLead = await LeadModel.countDocuments({
      listId:leaddata[0]?.listId,
      isDeleted:false
    });
    const updatelist = await listServices.updateCount({id:leaddata[0]?.listId,totalLead});
    return {data,updatelist};
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
    const data = await LeadAccount.findOne({_id:req?.params?.id},{ row:0 });
    return data;
}


export default {
    createLead,
    getLeadDataByListId,
    getLeadById,
    getLeadData,
}