"use client";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/common/button";
import TextInput from "@/components/common/TextInput";

import { getAllContractByEmail } from "@/lib/actions/dashboardActions";
import { ValidEmailError } from "@/lib/validation/dashboard.validation";

const initialState = {
  message: "",
  errors: {} as ValidEmailError,
};

export default function EnterEmailForm() {
  const [state, formAction] = useFormState(
    (state: any, formData: any) => getAllContractByEmail(state, formData),
    initialState
  );

  return (
    <div className="w-full min-h-screen bg-white">
      <form
        action={formAction}
        className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg"
      >
        {/* show all error message in there  */}
        <div className="mb-4">
          <p className="text-red-500 text-sm">{state?.message}</p>
        </div>

        <TextInput
          label="Email"
          id="email"
          name="email"
          error={state?.errors.email}
        />

        <SubmitButton />
      </form>
    </div>
  );
}
