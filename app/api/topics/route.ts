import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

//Create Topics
async function createTopic(data: { term: string; topic: string }) {
  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "Topics",
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating topic", error);
    throw new Error("Failed to create topic");
  }
}

//Fetch Topics
async function fetchTopics() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "Topics",
      [Query.orderDesc("$createdAt")]
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching topic", error);
    throw new Error("Failed to fetch topic");
  }
}

export async function POST(req: Request) {
  try {
    const { term, topic } = await req.json();
    const data = { term, topic };
    const response = await createTopic(data);
    return NextResponse.json({ message: "Topic created" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create topic",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const topics = await fetchTopics();
    return NextResponse.json(topics);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}
