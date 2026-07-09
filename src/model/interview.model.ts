import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IQuestion {
  index: number;

  question: string;

  answer: string;

  answerType: "voice" | "text";

  score: number;

  feedback: string;

  strengths: string[];

  improvements: string[];
}

export interface IInterview extends Document {
  userId: Types.ObjectId;

  jobTitle: string;

  company?: string;

  resumeUrl: string;

  resumeText: string;

  jobDescription: string;

  difficulty: "Easy" | "Medium" | "Hard";

  duration: number;

  questions: IQuestion[];

  technicalScore: number;

  communicationScore: number;

  confidenceScore: number;

  overallScore: number;

  strengths: string[];

  weaknesses: string[];

  feedback: string;

  status: "pending" | "completed";

  createdAt: Date;

  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  question: {
    type: String,
    required: true,
  },
  index: {
  type: Number,
  required: true,
},

  answer: {
    type: String,
    default: "",
  },

  answerType: {
    type: String,
    enum: ["voice", "text"],
    default: "voice",
  },

  score: {
    type: Number,
    default: 0,
  },

  feedback: {
    type: String,
    default: "",
  },

  strengths: {
    type: [String],
    default: [],
  },

  improvements: {
    type: [String],
    default: [],
  },
});

const InterviewSchema = new Schema<IInterview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      default: "",
    },

    resumeUrl: {
      type: String,
      default: "",
    },

    resumeText: {
      type: String,
      default: "",
    },

    jobDescription: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    duration: {
      type: Number,
      default: 20,
    },

    questions: {
      type: [QuestionSchema],
      default: [],
    },

    technicalScore: {
      type: Number,
      default: 0,
    },

    communicationScore: {
      type: Number,
      default: 0,
    },

    confidenceScore: {
      type: Number,
      default: 0,
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    feedback: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Interview: Model<IInterview> =
  mongoose.models.Interview ||
  mongoose.model<IInterview>("Interview", InterviewSchema);

export default Interview;