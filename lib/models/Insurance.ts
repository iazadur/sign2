import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IInsurance extends Document {
  clientId: Types.ObjectId; // Reference to the Client model
  insuranceProvider: string;
  policyNumber: number;
  coverageDetails: string;
  startDate: Date;
  endDate: Date;
  contractId?: Types.ObjectId; // Optional reference to Contract
}

// Insurance Schema
const InsuranceSchema = new Schema<IInsurance>({
  clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  insuranceProvider: { type: String, required: true },
  policyNumber: { type: Number, required: true, unique: true },
  coverageDetails: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  contractId: { type: Schema.Types.ObjectId, ref: 'Contract', sparse: true }, // Optional contract reference
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

export default mongoose.models.Insurance || mongoose.model<IInsurance>('Insurance', InsuranceSchema);
