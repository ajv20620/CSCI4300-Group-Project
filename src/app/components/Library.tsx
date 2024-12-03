'use client';
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Books from "../components/Books";
import { doLogout } from "..";
import { useRouter } from "next/navigation";

type Book = {
  _id: string;
  title: string;
  imageUrl: string;
};

export default function Library({ session }: { session: any }) {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
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

  const onRead = async (id: string) => {
    router.push(`reader/${id}`);
  };

  return (
    <div className="relative w-screen h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/library.jpg")' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        <Header buttons={libraryHeaderButtons}></Header>
        <div className="relative z-20 flex justify-center m-10">
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
    </div>
  );
}