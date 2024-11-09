"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const EditPage = ({ params }: { params: { id: string } }) => {
  const [formData, setFormData] = useState({ term: "", topic: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/topics/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch topic");
        }
        const data = await response.json();
        setFormData({ term: data.topic.term, topic: data.topic.topic });
      } catch (error) {
        setError("Failed to load topic");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.term || !formData.topic) {
      setError("Please fill in all the fields");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/topics/${params.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update topic");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Editing topic</h2>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <input
          type="text"
          name="term"
          placeholder="Term"
          value={formData.term}
          onChange={handleInputChange}
          className="py-1 px-4 border rounded-md"
        />
        <textarea
          name="topic"
          rows={5}
          placeholder="Topic"
          value={formData.topic}
          onChange={handleInputChange}
          className="py-1 px-4 border rounded-md resize-none"
        ></textarea>
        <button className="bg-blue-500 text-white mt-5 px-4 py-1 rounded-md cursor-pointer">
          {isLoading ? "Updating..." : "Update Topic"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default EditPage;
