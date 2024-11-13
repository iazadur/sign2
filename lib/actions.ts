'use server'

import { redirect } from "next/navigation";
import Client from "./models/Client";
import clientValidationSchema, { ClientValidationErrors } from "./validation/client.validation";


export async function createUser(prevState: Record<string, unknown>, formData: FormData): Promise<{
    message: string;
    errors: ClientValidationErrors;
} | undefined> {
    console.log('prev state', prevState)
    const validatedFields = clientValidationSchema.safeParse({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        telephone: formData.get('telephone') as string,
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        zip: formData.get('zip') as string,
        claimInsurance: formData.get('claimInsurance') as string,
    })

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            message: 'Invalid form data',
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // check if the client already exist
    const existClient = await Client.findOne({ email: validatedFields.data.email });
    if (existClient) {
        return {
            message: 'Client already exists',
            errors: {
                email: ['Client already exists'],
            },
        }
    }

    // Create the client
    const client = new Client(validatedFields.data);
    const result = await client.save();

    if (!result) {
        return {
            message: 'Failed to create client',
            errors: {},
        }
    }

    if (validatedFields.data.claimInsurance === 'yes') {
        // Do something
        console.log('Claim insurance')
        redirect(`/claim-insurance/${result._id}`)
    }


    return {
        message: 'Client created successfully',
        errors: {},
    }


}