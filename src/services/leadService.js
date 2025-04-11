import { LeadModel } from "../models/lead.js";
import { filterLinkedData } from "../core/screp/searchLeads.js";

const createLead = async (leaddata)=>{
    const data = await LeadModel.inserMany(leaddata);
    return data;
}

const filterLinkedInAccount = async (url) => {
  const data = await LinkedinAccount.find();
  const password = Encrypter.decrypt(data[0]?.password, data[0]?.iv);
  const filterData = await filterLinkedData(
    { email: data[0]?.email, password, userId: data?._id },
    url,
    saveScrapedData
  );
  return filterData;
};

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

const sendConnectionRequest = async (id) => {
  const lead = await LeadAccount.findById(id);
  // const user = await LinkedinAccount.find().limit(1);
  // const password = decryptPassword(user[0]?.password, user[0]?.iv);
  const data = await sendConnection(
    { email: "vikaschouhan@samyotech.com", password: "Vikas@192021" },
    lead
  );
  // const data = await sendConnection({ email: user[0]?.email, password }, lead);
  return data;
};

export default {
    filterLinkedInAccount,
    createLead,
    getLeadDataByListId,
    getLeadById,
    getLeadData,
    sendConnectionRequest
}