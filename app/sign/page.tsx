import { Suspense } from "react";
import SignatureCapture from "@/components/SignatureCapture";


export default function SignPage() {
  

  return (
    <Suspense>
      <SignatureCapture />
    </Suspense>
  );
}
