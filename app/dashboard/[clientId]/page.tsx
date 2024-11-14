import Client from "@/lib/models/Client";

export default async function Page({
  params: { clientId },
}: {
  params: { clientId: string };
}) {
  const data = await Client.findById(clientId)
    .populate({
      path: "contracts.contractId",
      model: "Contract",
      populate: {
        path: "insuranceId",
        model: "Insurance",
      },
    })
    .exec();
  if (!data) {
    return (
      <div className="text-center flex min-h-screen items-center flex-col justify-center">
        <h2 className="text-2xl font-bold">Client not found</h2>
        <p className="text-gray-500">
          The client with the ID provided does not exist.
        </p>
      </div>
    );
  }
  console.log("data", data);
  return (
    <div className="mt-4 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contracts</h2>
      <ul className="space-y-4">
        {data.contracts.map((contract: any) => (
          <li
            key={contract._id}
            className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{contract.title}</h3>
              <span
                className={`inline-block px-2 py-1 text-sm rounded ${
                  contract.signed
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {contract.signed ? "Signed" : "Not Signed"}
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                View
              </button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Update
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
