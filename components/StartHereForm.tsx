// StartHereForm
'use client'
import { useFormState } from 'react-dom'
import { createUser } from '@/lib/actions'
import { SubmitButton } from '@/components/common/button'

import { ClientValidationErrors } from '@/lib/validation/client.validation'
import TextInput from '@/components/common/TextInput'


const initialState = {
    message: '',
    errors: {} as ClientValidationErrors,
}

export default function StartFromHere() {
    const [state, formAction] = useFormState((state: any, formData: any) => createUser(state, formData), initialState)

    return (
        <div className="w-full min-h-screen bg-white">
            <form
                action={formAction}
                className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Claim Insurance Form
                </h2>

                {/* show all error message in there  */}
                <div className="mb-4">
                    <p className="text-red-500 text-sm">{state?.message}</p>
                </div>

                <TextInput
                    label="Name"
                    id="name"
                    name="name"
                    error={state?.errors.name}
                />

                <TextInput
                    label="Email"
                    id="email"
                    name="email"
                    error={state?.errors.email}
                />

                <TextInput
                    label="Telephone"
                    id="telephone"
                    name="telephone"
                    error={state?.errors.telephone}
                />

                <TextInput
                    label="Address"
                    id="address"
                    name="address"
                    error={state?.errors.address}
                />

                <TextInput
                    label="City"
                    id="city"
                    name="city"
                    error={state?.errors.city}
                />


                <TextInput
                    label="State"
                    id="state"
                    name="state"
                    error={state?.errors.state}
                />

                <TextInput
                    label="Zip"
                    id="zip"
                    name="zip"
                    error={state?.errors.zip}
                />

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Claim Insurance
                    </label>
                    <div className="flex items-center gap-4 text-gray-700">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="claimInsurance"
                                value="yes"
                                className="form-radio text-indigo-600"
                            />
                            <span className="ml-2">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="claimInsurance"
                                value="no"
                                className="form-radio text-indigo-600"
                            />
                            <span className="ml-2">No</span>
                        </label>
                    </div>
                    <p aria-live="polite" className='text-red-500'>{state?.errors.claimInsurance}</p>
                </div>

                <SubmitButton />
            </form>
        </div>
    )
}