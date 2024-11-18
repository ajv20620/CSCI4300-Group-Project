"use client";
import Header from "../components/Header";
import Button from "../components/Button";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

type HeaderData = {
    firstLink: string;
    firstLinkName: string;
    secondLink: string;
    secondLinkName: string;
};

export default function Additem() {
    const [book, setBook] = useState({
        title:'',
        imageUrl:'',
    });
    const router = useRouter();


    const addItemHeader: HeaderData = {
        firstLink: "../../",
        firstLinkName: "Logout",
        secondLink: "/library", 
        secondLinkName: "Cancel"
    }

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
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
        <div>
            <Header header={addItemHeader}/>
            <form className="m-10">
                <h1>Book Title:</h1>
                <input type="text" id="book-title" className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Enter a title."
                value={book.title}
                onChange={(e) => setBook({...book, title: e.target.value})}/>
                <h1>Link to Cover:</h1>
                <input type="text" id="book-cover" className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Enter a link to a cover."
                value={book.imageUrl}
                onChange={(e) => setBook({...book, imageUrl: e.target.value})}/>
                <div className="m-10">
                  <Button type="submit" onClick={onSubmit}>Submit</Button>
                </div>
            </form>

        </div>
    );
    }