import { LeadModel } from "../models/lead.js";
import listServices from "./listServices.js";

const createLead = async (leaddata)=>{
    const data = await LeadModel.insertMany(leaddata);
    const totalLead = await LeadModel.find({
      listId:leaddata[0]?.listId,
      isDeleted:false
    });
    const totalLeadCount = await LeadModel.countDocuments({
      listId:leaddata[0]?.listId,
      isDeleted:false
    });
    const updatelist = await listServices.updateCount({id:leaddata[0]?.listId,totalLeadCount});
    return totalLead;
}

const getLeadData = async () => {
    const data = await LeadAccount.find({}, { row: 0 });
    return data;
  };

const getLeadDataByListId = async (listId) => {
  const data = await LeadAccount.find({listId:listId}, { row: 0 });
  return data;
};

const getLeadById = async (req)=>{
    const data = await LeadAccount.findOne({_id:req?.params?.id},{ row:0 });
    return data;
}

const getPaginatedLead = async(req)=>{
      const { id, page = 1, limit = 10, search } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);
        
      const matchCondition = {
        _id: new mongoose.Types.ObjectId(id),
        isDeleted: false,
      };
        
      if (search) {
        matchCondition.$or = [
          { name: { $regex: search, $options: 'i' } },
          { headline: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
        ];
      }
        
      const [ data,totalCount ] = await Promise.all([
          ListModel.aggregate([
              { $match: matchCondition },
              { $skip: skip },
              { $limit: parseInt(limit) }
          ]),
          ListModel.countDocuments(matchCondition)
      ]);    
      
      return {data,totalCount};
}

export default {
    createLead,
    getLeadDataByListId,
    getLeadById,
    getLeadData,
    getPaginatedLead
}