import Client from "@/lib/models/Client"



export default async function Page({
  params: { clientId },
}: {
  params: { clientId: string }
}) {
  const data = await Client.findById(clientId)
  console.log(data);
  return (
    <div className=""></div>
  )
}