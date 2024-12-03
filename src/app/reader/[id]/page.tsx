'use client';
import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import EpubRenderer from "@/app/components/EpubRenderer";
import { useEffect } from "react";

export default function readerPage() {
  const params = useParams();
  const bookId = params?.id as string;
  const [filePath, setFilePath] = useState<string>();
  const [error, setError] = useState<string>();
  const fetchBook = async () => {
    try {
        const response = await fetch(`/api/books/${bookId}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        console.log(response.status);
        const data = await response.json();
        const filePath = data.book?.filePath;
    
        if (!filePath) {
          throw new Error("File path not found for the selected book");
        }
 
        setFilePath(filePath);
      } catch (error) {
        console.log(error);
        setError("Error: " + error)
      }
  }

  useEffect( () => {
    fetchBook();
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-900 text-white">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Reading Book: {bookId}</h1>
        <button
          onClick={() => history.back()} // Navigate back to the previous page
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Close Reader
        </button>
      </div>
      <div className="p-4">
        <EpubRenderer epubPath={filePath as string} />
      </div>
      {error && <p className="text-red-600 font-bold">{error}</p>}
    </div>
  );
};
