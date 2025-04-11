import mongoose from "mongoose";

const leadSchema = mongoose.Schema({
    profileUrl: { type: String, required: true, unique: true },
    name: { type:String,required:false },
    title: { type:String,required:false },
    company: { type:String,required:false },
    email: { type:String,required:false },
    phone: { type:String,required:false },
    listId: { type:mongoose.Types.ObjectId,ref:'List',required:true },
    connectionStatus: {
        type: String,
        enum: ['not_connected', 'pending', 'connected', 'rejected'],
        default: 'not_connected'
    },
    notes: { type:String,required:false },
    tags: { type:String,required:false },
    isDeleted:{
        type:Boolean,
        default:false
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const LeadModel = mongoose.model('Lead',leadSchema);