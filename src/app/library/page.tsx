"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Books from "../components/Books";
import Button from "../components/Button";
import { doLogout } from "..";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EpubRenderer from "../components/EpubRenderer";

type Book = {
  _id: string;
  title: string;
  imageUrl: string;
};

export default function Library() {
  const router = useRouter();
  const { data: session } = useSession();

  const libraryHeaderButtons = [
    {
      label: "Add Item",
      onClick: () => router.push("/add-item"),
    },
    {
      label: "Logout",
      onClick: () => {
        doLogout();
        router.push("/");
      },
    },
  ];

  const [books, setBooks] = useState<Book[]>([]);
  const [currentFilePath, setCurrentFilePath] = useState<string | null>(null); // Track the current file path

  const fetchBooks = async () => {
    const owner = session?.user?.username;
    try {
      const response = await fetch(`/api/books?owner=${owner}`);
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      const data = await response.json();
      setBooks(data.books);
    } catch (error) {
      console.log("Error from Books:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.username) {
      fetchBooks();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("network response was not ok");
      }
      fetchBooks();
    } catch (error) {
      console.log("Error in ShowItemDetails_deleteClick");
    }
  };

  const handleUpdate = async (id: string) => {
    router.push(`/update-book/${id}`);
  };

  const onSubmit = async () => {
    doLogout();
  };

  const onRead = async (id: string) => {
    router.push(`reader/${id}`);
  };

  const handleCloseReader = () => {
    setCurrentFilePath(null);
  };

  return (
    <div className="w-screen h-screen bg-yellow-500">
      <Header buttons={libraryHeaderButtons}></Header>
      <div className="flex justify-center m-10">
        {/* Conditional rendering for books */}
        {books.length === 0 ? (
          <div className="text-xl font-semibold">
            There are no books in your library. Add one to get started!
          </div>
        ) : (
          <Books
            books={books}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onRead={onRead}
          />
        )}
      </div>

      {currentFilePath && (
      <div className="mt-10 flex justify-center">
        <EpubRenderer epubPath={currentFilePath} />
        <button
          onClick={handleCloseReader}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
        Close Reader
        </button>
      </div>
)}


      <div className="m-20 flex justify-center">
        <Button type="submit" onClick={onSubmit}>
          Logout
        </Button>
      </div>
    </div>
  );
}
