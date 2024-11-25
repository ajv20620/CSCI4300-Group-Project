"use client";
import Header from "../components/Header";
import Button from "../components/Button";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { doLogout } from "..";

export default function Additem() {
    const [book, setBook] = useState({
        title:'',
        imageUrl:'',
    });
    const router = useRouter();
    const [error, setError] = useState("");

    const addItemHeaderButtons = [
      {
        label: "Cancel",
        onClick: () => router.push("/library"),
      },
      {
        label: "Logout",
        onClick: () => {
          doLogout();
          router.push("/");
        }
      },
    ];

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!book.title || !book.imageUrl) {
          setError("Cannot add book. Please try again");
          return;
      }

        try {
          const response = await fetch('api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          //clear input
          setBook({
            title: '',
            imageUrl: '',
          });

          router.push('/library');
        } catch (error) {
          console.error('Error in CreateItem', error);
        }
    };


    return(
      <div className="flex flex-col items-center justify-center w-screen h-screen text-white">
            <Header buttons={addItemHeaderButtons}/>
            <form className="w-[90%] max-w-md p-6 bg-yellow-500 shadow-md rounded-lg text-white flex flex-col gap-4 m-10 z-10">
                <h1 className="font-bold text-lg">Book Title:</h1>
                <input type="text" id="book-title" className="w-full p-2 mt-2 border text-blue-600 border-blue-300 rounded-md"
                placeholder="Enter a title."
                value={book.title}
                onChange={(e) => setBook({...book, title: e.target.value})}/>
                <h1 className="font-bold text-lg">Link to Cover:</h1>
                <input type="text" id="book-cover" className="w-full p-2 mt-2 border text-blue-600 border-blue-300 rounded-md"
                placeholder="Enter a link to a cover."
                value={book.imageUrl}
                onChange={(e) => setBook({...book, imageUrl: e.target.value})}/>

            {error && (
              <p className="text-red-600 font-bold">{error}</p>
            )}

                <div className="flex justify-center m-10">
                  <Button type="submit" onClick={onSubmit}>Add</Button>
                </div>
            </form>

        </div>
    );
    }
