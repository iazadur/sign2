"use client";

import { pickContracts } from "@/lib/actions/pickContractActions";
import { SubmitButton } from "./common/button";
import { useFormState } from "react-dom";
import { contractList } from "@/lib/validation/contract.validation";

interface PickContractFormProps {
  id: string;
}

const initialState = {
  message: "",
};

export default function PickContractForm({ id }: PickContractFormProps) {
  const [state, formAction] = useFormState(
    (state: any, formData: any) => pickContracts(id, formData),
    initialState
  );
  console.log("state", state);
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-sm rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Select a Contract
      </h2>
      <div className="text-green-500 text-sm mb-2 font-semibold">{state?.message}</div>
      <form action={formAction} className="space-y-6">
        <div className="space-y-3">
          {contractList.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 rounded-md px-3 hover:bg-gray-50 border border-gray-200 shadow-sm transition"
            >
              <input
                name="contract"
                type="checkbox"
                value={item.id} // Set the checkbox value to item.id or any unique identifier
                className="form-checkbox text-blue-600"
              />
              <span className="font-normal text-gray-600 !m-0 py-3 w-full">
                {item.label}
              </span>
            </label>
          ))}
        </div>

        <div className="">
          <h4 className="font-semibold text-black">Select Contract Type</h4>
          <div className="flex items-center gap-3">
            <label className="flex gap-2">
              <input
                type="radio"
                name="contractType"
                value="sign-now"
                className="form-radio text-blue-600"
              />
              <span className="font-normal text-gray-600 !m-0 py-3 w-full text-nowrap">
                Sign Now
              </span>
            </label>

            <label className="flex gap-2">
              <input
                type="radio"
                name="contractType"
                value="email-sign"
                className="form-radio text-blue-600"
              />
              <span className="font-normal text-gray-600 !m-0 py-3 w-full text-nowrap">
                Email Sign
              </span>
            </label>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <SubmitButton>Save</SubmitButton>
        </div>
      </form>
    </div>
  );
}
