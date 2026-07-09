import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  provider: "google";
  isVerified: boolean;
  interviewCount: number;
  lastInterviewReset: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    provider: {
      type: String,
      enum: ["google"],
      default: "google",
    },

    isVerified: {
      type: Boolean,
      default: true, // Google accounts are already verified
    },

    interviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastInterviewReset: {
      type: Date,
      default: Date.now,
    },
    
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;