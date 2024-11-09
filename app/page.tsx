"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ITopic {
  $id: string;
  term: string;
  topic: string;
}

export default function Home() {
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/topics");
        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.log("Error:", error);
        setError("Failed to load topics. Please reload the page.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/topics/${id}`, { method: "DELETE" });
      setTopics((prevTopics) => prevTopics?.filter((i) => i.$id !== id));
    } catch (error) {
      setError("Failed to delete topic. Please try again.");
    }
  };
  return (
    <div>
      {error && <p className="py-4 text-red-500">{error}</p>}
      {isLoading ? (
        <p>Loading topics...</p>
      ) : topics?.length > 0 ? (
        <div>
          {topics?.map((topic) => (
            <div
              key={topic.$id}
              className="p-4 my-2 rounded-md border-b leading-7"
            >
              <div className="font-bold">{topic.term}</div>
              <div>{topic.topic}</div>
              <div className="flex gap-4 mt-4 justify-end">
                <Link
                  className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                  href={`/edit/${topic.$id}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(topic.$id)}
                  className="text-white bg-red-500 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-48 font-bold text-center text-6xl text-gray-600">
          No Topics Found
        </p>
      )}
    </div>
  );
}
