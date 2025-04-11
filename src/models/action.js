import mongoose from "mongoose";
const ActionSchema = mongoose.Schema({
    type:{
        type:String,
        enum:['viewProfile', 'sendConnection', 'checkConnection', 'sendMessage', 'checkMessageReply', 'customAction'],
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
});

export const ActionModel = mongoose.model('Action',ActionSchema);