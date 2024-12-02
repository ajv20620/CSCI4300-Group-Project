"use client";
import Header from "../components/Header";
import Button from "../components/Button";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { doLogout } from "..";
import { useRef } from "react";
import { useSession } from "next-auth/react"

export default function Additem() {
    const { data: session, status } = useSession();
    const [book, setBook] = useState({
        title:'',
        imageUrl:'',
    });
    const router = useRouter();
    const [error, setError] = useState("");
    const file = useRef<HTMLInputElement>(null);
    

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
        
        const owner = session?.user?.username;
        if (!book.title || !book.imageUrl || !owner || !file) {
          console.log(file);
          console.log("User: "+owner);
          console.log("public/uploads/" + file?.current?.files?.[0].name!)
          setError("Cannot add book. Please try again");
          return;
        }

        const bookForm = new FormData();
        bookForm.append("title", book.title);
        bookForm.append("imageUrl", book.imageUrl);
        bookForm.append("file", file?.current?.files?.[0]!);
        bookForm.append("owner", owner);

        try {
          const response = await fetch('api/books', {
            method: 'POST',
            //headers: {
            //    'Content-Type': 'application/json'
            //},
            body: bookForm,
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
                <h1 className="font-bold text-lg">Upload file:</h1>
                <input type="file" id="file-path" ref={file} className="w-full p-2 mt-2 border text-blue-600 border-blue-300 rounded-md"
                placeholder="Select an epub file."/>
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
