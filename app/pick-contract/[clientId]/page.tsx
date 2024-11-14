import PickContractForm from "@/components/PicContractForm";

export default async function Page({
  params: { clientId },
}: {
  params: { clientId: string };
}) {
  console.log("clientId", clientId);
  return (
    <div className="">
      <PickContractForm />
    </div>
  );
}
