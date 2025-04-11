import mongoose from "mongoose";
const batchSchema = mongoose.Schema({
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    leads: [{
      leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
      stepIndex: { type: Number, default: 0 },
      status: {
        type: String,
        enum: ['waiting', 'done', 'error'],
        default: 'waiting'
      }
    }],
    date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed'],
      default: 'pending'
    },
    createdAt: { type: Date, default: Date.now }
});

export const batchModel = mongoose.model('Batch',batchSchema);
  