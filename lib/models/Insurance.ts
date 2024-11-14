import mongoose, { Schema, Document, Types } from "mongoose";

export interface IInsurance extends Document {
  clientId: Types.ObjectId; // Reference to the Client model
  insuranceId: number;
  name: string;
  email: string;
  telephone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  contractId?: Types.ObjectId; // Optional reference to Contract
}

// Insurance Schema
const InsuranceSchema = new Schema<IInsurance>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    insuranceId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },

    contractId: { type: Schema.Types.ObjectId, ref: "Contract", sparse: true }, // Optional contract reference
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Pre-save middleware to set a 4-digit insuranceId
InsuranceSchema.pre("save", async function (next) {
  // Check if insuranceId is already set to avoid overwriting on update
  if (!this.insuranceId) {
    try {
      // Find the highest existing insuranceId and increment it
      const lastInsurance = await mongoose
        .model("Insurance")
        .findOne({})
        .sort({ insuranceId: -1 })
        .select("insuranceId");

      // Set to 2901 if there are no existing records, otherwise increment
      this.insuranceId = lastInsurance ? lastInsurance.insuranceId + 1 : 2901;

      // Ensure it's always 4 digits
      if (String(this.insuranceId).length > 4) {
        throw new Error("Insurance ID has exceeded the 4-digit limit");
      }

      next();
    } catch (error: any) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.models.Insurance ||
  mongoose.model<IInsurance>("Insurance", InsuranceSchema);
