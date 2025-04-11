import axios from "axios";
import 'dotenv/config';
import { Scrapping_Routes } from "../core/common/constant.js";

const connectAccount = async (loginDetails)=>{
    const isConnected = await axios.post(
        process.env.SCRAPPING_SERVER_URL + '/' + Scrapping_Routes?.connect_account,
        {...loginDetails}
    );
    console.log("isConnected : ",isConnected);    
    return isConnected?.data;
}

export default {
    connectAccount
}