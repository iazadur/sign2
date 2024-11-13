import Client from "@/lib/models/Client";
// import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    // await connectToDatabase();

    // Retrieve all clients
    const clients = await Client.find()
      .populate("insurances")
      .populate("contracts");

    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}
export async function POST() {}
export async function PUT() {}
export async function DELETE() {}
