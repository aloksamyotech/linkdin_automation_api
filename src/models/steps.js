import mongoose from "mongoose";
const StepSchema = mongoose.Schema({
    campaignId : {
        type:mongoose.Types.ObjectId,
        ref:'Campaign',
        required:true
    },
    index:{
        type:Number,
        required:true
    },
    actionId:{
        type:mongoose.Types.ObjectId,
        ref:'Action',
        required:true
    },
    delay:{
        type:Number,
        required:false
    },
    useActionResultAsCondition: {
        type:Boolean,
        default:false
    },
    iftrueGoToStep:{
        type:Number,
        required:false
    },
    iffalseGoToStep:{
        type:Number,
        required:false
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now(),
    }
});

export const StepModel = mongoose.model('Step',StepSchema);