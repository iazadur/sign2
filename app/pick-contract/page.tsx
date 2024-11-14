
import { Suspense } from "react";
import PickContractForm from "@/components/PicContractForm";


export default function Page() {

  return (
    <Suspense>
      <PickContractForm />
    </Suspense>
  );
}

