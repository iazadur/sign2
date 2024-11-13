import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  telephone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  contracts: Types.ObjectId[];  // Array of references to Contract model
}

// Client Schema
const ClientSchema = new Schema<IClient>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  contracts: [{ type: Schema.Types.ObjectId, ref: 'Contract' }],  // Array of Contract references
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

export default mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);
