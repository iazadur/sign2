import PickContractForm from "@/components/PicContractForm";

export default async function Page({
  params: { clientId },
}: {
  params: { clientId: string };
}) {
  return (
    <div className="">
      <PickContractForm id={clientId} />
    </div>
  );
}
