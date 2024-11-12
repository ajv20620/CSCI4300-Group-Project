"use client";
import Header from "../components/Header";
import Button from "../components/Button";
import React, { useState } from 'react';

type HeaderData = {
    firstLink: string;
    firstLinkName: string;
    secondLink: string;
    secondLinkName: string;
};

export default function Additem() {
    const [titleInput, setTitleInput] = useState("");
    const [imageUrlInput, setImageUrlInput] = useState("");

    const addItemHeader: HeaderData = {
        firstLink: "../../",
        firstLinkName: "Logout",
        secondLink: "/library", 
        secondLinkName: "Cancel"
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newBook = {
            titleInput,
            imageUrlInput
        }
        console.log("Title: " + newBook.titleInput);
        console.log("Link: " + newBook.imageUrlInput);
        
        setTitleInput("");
        setImageUrlInput("");
    }


    return(
        <div>
            <Header header={addItemHeader}/>
            <form className="m-10">
                <h1>Book Title:</h1>
                <input type="text" id="book-title" className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Enter a title."
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}/>
                <h1>Link to Cover:</h1>
                <input type="text" id="book-cover" className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Enter a link to a cover."
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}/>
                <div className="m-10">
                  <Button type="submit" onClick={onSubmit}>Submit</Button>
                </div>
            </form>

        </div>
    );
    
}