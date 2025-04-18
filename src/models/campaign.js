import mongoose from "mongoose";

const campaignSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        enum: ['draft', 'active', 'paused', 'completed', 'failed'],
        default: 'draft'
    },
    dailyLeadLimit: { 
        type: Number, 
        default: 30 
    },
    linkedInId : { 
        type: mongoose.Types.ObjectId, 
        ref:'LinkedinAccount',
        required: true
    },
    listId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'List', 
        required: true 
    },
    createdBy: { 
        type:mongoose.Types.ObjectId, 
        ref:'User', 
        required: true },
    isDeleted:{ 
        type:Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
});

export const CampaignModel = mongoose.model('Campaign',campaignSchema);
