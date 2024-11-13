import { IClient } from "@/lib/models/Client";

// app/clients/page.tsx (or .jsx if using JavaScript)
export default async function ClientsPage() {
  const res = await fetch("http://localhost:3000/api/client", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch clients");
  }

  const clients = await res.json();
  console.log(clients);

  return (
    <div>
      <h1>Clients</h1>
      <ul>
        {clients.data.map((client: IClient, idx: number) => (
          <li key={idx}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
}
