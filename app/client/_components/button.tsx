'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 mt-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
    >
      Submit
    </button>
  )
}