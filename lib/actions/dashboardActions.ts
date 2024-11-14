"use server";

import { redirect } from "next/navigation";

import Client from "../models/Client";
import { validEmail, ValidEmailError } from "../validation/dashboard.validation";



export async function getAllContractByEmail(
  prevState: Record<string, unknown>,
  formData: FormData
): Promise<
  | {
      message: string;
      errors: ValidEmailError;
    }
  | undefined
> {
  // Do something

  const validatedFields = validEmail.safeParse({
    email: formData.get("email") as string,
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      message: "Invalid form data",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // get all contract by email
  const result = await Client.findOne({
    email: validatedFields.data.email,
  });

  if (!result) {
    return {
      message: "Failed to get contracts",
      errors: {},
    };
  }

  redirect(`/dashboard/${result._id}`);
  return {
    message: "Success",
    errors: {},
  };
}
