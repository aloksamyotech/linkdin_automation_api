import linkedinAccountServices from "../services/linkedinServices.js";
import { statusCodes } from "../core/common/constant.js";

const connectLinkedinAccount = async (req, res, next) => {
  const data = await linkedinAccountServices.connectLinkedinAccount(
    req,
    res,
    next
  );
  res.status(statusCodes?.created).send(data);
};

const updateOtp = async (req,res)=>{
  const data = await linkedinAccountServices.updateOtp(req);
  res.status(statusCodes?.ok).send(data);
}

const updateStatus = async (req,res)=>{
  const data = await linkedinAccountServices.updateStatus(req);
  res.status(statusCodes?.ok).send(data);
}

const getOtp = async (req,res)=>{
  const data = await linkedinAccountServices.getOtp(req);
  res.status(statusCodes?.ok).send(data);
}

const getLinkedinAccount = async (req, res) => {
  const data = await linkedinAccountServices.getLinkedinAccount();
  res.status(statusCodes?.ok).send(data);
};

const getLinkedinAccountByUserId = async(req,res)=>{
  const data = await linkedinAccountServices.getLinkedinAccountByUserId(req);
  res.status(statusCodes?.ok).send(data);
}

const getLinkedinAccountById = async(req,res)=>{
  const data = await linkedinAccountServices.getLinkedinAccountById(req);
  res.status(statusCodes?.ok).send(data);
}

const getPaginatedData = async(req,res)=>{
  const data = await linkedinAccountServices.getPaginatedLinkedInAccount(req);
  res.status(statusCodes.ok).send(data);
}

export default {
  connectLinkedinAccount,
  getLinkedinAccount,
  getLinkedinAccountByUserId,
  updateOtp,
  getLinkedinAccountById,
  updateStatus,
  getOtp,
  getPaginatedData
};
