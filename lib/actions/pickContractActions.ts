"use server";

import { redirect } from "next/navigation";

import Client from "../models/Client";
import {
  ContractError,
  ContractValidationSchema,
} from "../validation/contract.validation";
import Contract from "../models/Contract";

export async function pickContracts(
  id: string,
  formData: FormData
): Promise<
  | {
      message: string;
      errors: ContractError;
    }
  | undefined
> {
  // Retrieve all selected contract values as an array
  const contractsData = formData.getAll("contract") as string[];
  const contractType = formData.get("contractType") as string;

  // Validate the form data
  const validatedFields = ContractValidationSchema.safeParse({
    contract: contractsData,
    contractType,
  });

 
  if (!validatedFields.success) {
    return {
      message: "Invalid form data",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Find the client by ID
  const client = await Client.findById(id);
  if (!client) {
    return { message: "Client not found", errors: {} };
  }
console.log("client", client);
  // Retrieve existing contracts for the client
  const existingContracts = await Contract.find({
    clientId: client._id,
    contractId: { $in: validatedFields.data.contract },
  });

  // Filter out contracts that are already created
  const existingContractIds = new Set(
    existingContracts.map((contract) => contract.contractId)
  );
  const newContractsData = validatedFields.data.contract.filter(
    (contractId) => !existingContractIds.has(contractId)
  );

  // Create and save new contracts
  const newContracts = newContractsData.map(
    (contractId) =>
      new Contract({
        clientId: client._id,
        contractId,
        contractType: validatedFields.data.contractType,

      })
  );
  await Promise.all(newContracts.map((newContract) => newContract.save()));

  // Add references to new contracts in the client document
  newContracts.forEach((newContract) => {
    client.contracts.push({
      contractId: newContract._id,
      
    });
  });
  await client.save();
  // Redirect to the dashboard with the client ID
  redirect(`/dashboard/${id}`);
  return { message: "Success", errors: {} };
}
