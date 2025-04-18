import mongoose from "mongoose";

const ListSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:['people','post_reactors','csv','company']
    },
    leadCount:{
        type:Number,
        default:0
    },
    linkedInId:{
        type:mongoose.Types.ObjectId,
        ref:'LinkedinAccount',
        required: true
    },
    createdBy:{
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