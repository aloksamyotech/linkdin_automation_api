import 'dotenv/config';
import { Scrapping_Routes } from "../core/common/constant.js";
import { postApi } from '../core/common/api.js';

const connectAccount = async (loginDetails)=>{
    const isConnected = await postApi(Scrapping_Routes?.connect_account,{...loginDetails});
    return isConnected?.data;
};

const verifyOtp = async(data)=>{
    const response = await postApi(Scrapping_Routes?.verify_otp,data);
    return response?.data;
}

const scrappLead = async(data)=>{
    const response = await postApi(Scrapping_Routes?.scrap_lead,data);
    return response?.data;
};

const viewProfile = async(data)=>{
    const response = await postApi(Scrapping_Routes?.view_profile,data);
    return response?.data;
};

const sendConnectionRequest = async(data)=>{
    const response = await postApi(Scrapping_Routes?.send_connection_request,data);
    return response?.data;
};

const sendMessage = async(data)=>{
    const response = await postApi(Scrapping_Routes?.send_message,data);
    return response?.data;
};

const checkStatus = async(data)=>{
    const response = await postApi(Scrapping_Routes?.check_status,data);
    return response?.data;
};

const postLike = async(data)=>{
    const response = await postApi(Scrapping_Routes?.post_like,data);
    return response?.data;
}

const checkMessageReply = async(data)=>{
    const response = await postApi(Scrapping_Routes?.check_reply_status,data);
    return response?.data;
}

export default {
    connectAccount,
    verifyOtp,
    scrappLead,
    viewProfile,
    sendConnectionRequest,
    sendMessage,
    checkStatus,
    postLike,
    checkMessageReply
}