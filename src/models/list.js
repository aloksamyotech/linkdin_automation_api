import mongoose from "mongoose";

const ListSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    linkedInId:{
        type:mongoose.Types.ObjectId,
        ref:'LinkedinAccount',
        required:true
    },
    type:{
        type:String,
        required:true
    },
    leadCount:{
        type:Number,
        default:0
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    createAt:{
        type:Date, 
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
});

export const ListModel = mongoose.model('List',ListSchema);