'use client'
import PickContractForm from "@/components/PicContractForm";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const clientId = searchParams.get("client") || "";
  return (
    <div className="">
      <PickContractForm id={clientId} />
    </div>
  );
}

