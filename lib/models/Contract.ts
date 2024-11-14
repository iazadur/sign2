import mongoose, { Schema, Document, Types } from "mongoose";

export interface IContract extends Document {
  clientId: Types.ObjectId; // Updated to match ObjectId type in MongoDB
  contractId: string;
  contractType: string;
  signed: boolean;
  signedDate?: Date;
  signature?: string;
  insurance?: Types.ObjectId; // Matching ObjectId type for insurance reference
}

// Contract Schema
const ContractSchema = new Schema<IContract>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    contractId: { type: String, required: true },
    contractType: { type: String, required: true },
    signed: { type: Boolean, default: false },
    signedDate: { type: Date },
    signature: { type: String }, // Stores base64 or URL to signature image
    insurance: { type: Schema.Types.ObjectId, ref: "Insurance", sparse: true }, // Optional insurance reference
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export default mongoose.models.Contract ||
  mongoose.model<IContract>("Contract", ContractSchema);
