import mongoose from "mongoose";
const LinkedinAccountSchema = mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
      isAuthenticate: {
        type: Boolean,
        default: false,
      },
      otp:{
        type:String,
        required:false,
        default:null
      },
      isConnected: {
        type: Boolean,
        default: false,
      },
      isDeleted:{
        type:Boolean,
        default:false,
      },
      createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
);

export const LinkedinAccount = mongoose.model(
    "LinkedinAccount",
    LinkedinAccountSchema
);