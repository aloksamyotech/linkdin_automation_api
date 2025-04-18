import { LinkedinAccount } from "../models/linkedinaccount.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { Encrypter } from "../core/common/helper.js";
import ScrappingService from "../external/ScrappingService.js";
import mongoose from "mongoose";

const connectLinkedinAccount = async (req) => {
  const { isAuthenticate, email, password, userId } = req.body;
  const isUserAlreadyExist = await LinkedinAccount.findOne({ email,isDeleted:false });
  
  if (isUserAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist
    );
  }

  const encryptedData = Encrypter.encrypt(password);
  const loginDetails = { username: email, password, isAuthenticate };
  const { success, otpRequired, message, sessionId } = await ScrappingService.connectAccount(loginDetails);

  const data = {
      email,
      password: encryptedData,
      isAuthenticate,
      isConnected: success,
      createdBy: userId
  };
    
  const user =  await LinkedinAccount.create({ ...data });

  return {
      user,
      success,
      message,
      ...(otpRequired && { isOtpRequired: true, sessionId }),
  };
};

const getLinkedinAccount = async () => {
  const data = await LinkedinAccount.find({isDeleted:false});
  return data;
};

const updateStatus = async (req)=>{
    const data = await LinkedinAccount.findOneAndUpdate(
        { _id:req?.params?.id },
        { $set:{isConnected:req?.body?.success,otp:null}  },
        { new:true }
    )
    return data;
}

const getLinkedinAccountByUserId = async(userId)=>{
    const data = await LinkedinAccount.find({createdBy:userId, isDeleted:false});
    return data;
}

const getLinkedinAccountById = async(id)=>{
    const data = await LinkedinAccount.findOne({_id:id, isDeleted:false});
    return data;
}

const updateOtp = async(req)=>{
    const data = await LinkedinAccount.findOneAndUpdate(
        { _id: req?.body?.id },
        { $set: { otp: req?.body?.otp } },
        { new:true }
    );
    return data;
 }
 
const getOtp = async(req)=>{
    const data = await LinkedinAccount.findOne({_id:req.body.id,otp:{ $ne:null }});
    return data;
}

const getPaginatedLinkedInAccount = async(req)=>{
  const { userId, page = 1, limit = 10 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const [data, totalCount] = await Promise.all([
    LinkedinAccount.find({ createdBy: new mongoose.Types.ObjectId(userId), isDeleted:false })
      .skip(skip) 
      .limit(parseInt(limit)),
      
    LinkedinAccount.countDocuments({ createdBy: new mongoose.Types.ObjectId(userId), isDeleted:false })
  ]);

  return {data,totalCount};
}

export default {
  connectLinkedinAccount,
  getLinkedinAccount,
  getLinkedinAccountByUserId,
  updateStatus,
  updateOtp,
  getLinkedinAccountById,
  getOtp,
  getPaginatedLinkedInAccount
};
