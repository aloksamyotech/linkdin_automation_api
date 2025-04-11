import mongoose from "mongoose";
const DaliyLimitSchema = mongoose.Schema({
    linkedInId :{
        type:mongoose.Types.ObjectId,
        ref:'LinkedinAccount',
        required:true
    },
    follow:{
        type:Number,
        default:40,
        required:false
    },
    connection_request:{
        type:Number,
        default:40,
        required:false
    },
    send_message:{
        type:Number,
        default:40,
        required:false
    },
    send_mail:{
        type:Number,
        default:40,
        required:false
    },
    post_like:{
        type:Number,
        default:40,
        required:false
    },
    view_profile:{
        type:Number,
        default:40,
        required:false
    },
    view_profile:{
        type:Number,
        default:40,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
});

export const DailyLimitModel = mongoose.model('DailyLimit',DaliyLimitSchema);