import mongoose, { Schema, Document, Types } from "mongoose";

interface Contract {
  contractId: string;
  insuranceId: string;
}
export interface IClient extends Document {
  name: string;
  email: string;
  telephone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  contracts: Contract[];
}

// Client Schema
const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    contracts: [
      {
        contractId: { type: Types.ObjectId, required: true },
        insuranceId: { type: Types.ObjectId, default: null },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.models.Client ||
  mongoose.model<IClient>("Client", ClientSchema);
