"use client"; // Note: This is a client-side component

import { submitSignature } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";


export default function SignatureCapture() {
  const searchParams = useSearchParams();
  const contractId = searchParams.get("contract") || "";
  const signatureRef: any = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleSubmit = async () => {
    if (signatureRef.current.isEmpty()) return alert("Please provide a signature");

    setIsSubmitting(true);

    // Get the data URL of the signature as a base64 string
    const signatureData = signatureRef.current.toDataURL("image/png");
    console.log("signatureData", signatureData);
    // Call the server action with the base64 data
    await submitSignature(contractId,signatureData);
    setIsSubmitting(false);
  };

  return (
    <div>
      <SignatureCanvas
        ref={signatureRef}
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
      />
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
