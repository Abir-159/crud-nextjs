import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// Fetch a specific topic
async function fetchTopic(id: string) {
  try {
    const topic = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "Topics",
      id
    );
    return topic;
  } catch (error) {
    console.error("Error fetching topic:", error);
    throw new Error("Failed to fetch topic");
  }
}

// Delete a specific topic
async function deleteTopic(id: string) {
  try {
    const response = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "Topics",
      id
    );
    return response;
  } catch (error) {
    console.error("Error deleting topic:", error);
    throw new Error("Failed to delete topic");
  }
}

// Update a specific topic
async function updateTopic(id: string, data: { term: string; topic: string }) {
  try {
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "Topics",
      id,
      data
    );
    return response;
  } catch (error) {
    console.error("Error updating topic:", error);
    throw new Error("Failed to update topic");
  }
}

export async function GET(req: Request, { params }: { id: string }) {
  try {
    const id = params.id;
    const topic = await fetchTopic(id);
    return NextResponse.json({ topic });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch topic" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { id: string }) {
  try {
    const id = params.id;
    await deleteTopic(id);
    return NextResponse.json({ message: "Topic deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete topic" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { id: string }) {
  try {
    const id = params.id;
    const topic = await req.json();
    await updateTopic(id, topic);
    return NextResponse.json({ message: "Topic updated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update topic" },
      { status: 500 }
    );
  }
}
