"use client"
import Header from "../../components/Header";
import Button from "../../components/Button";
import Image from "next/image"
import {useState, useEffect} from "react";
import {useRouter, useParams} from "next/navigation";


type HeaderData = {
    firstLink: string;
    firstLinkName: string;
    secondLink: string;
    secondLinkName: string;
};



export default function updatePage() {
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const updateHeader: HeaderData = {
        firstLink: "/library",
        firstLinkName: "Back to Library",
        secondLink: "/",
        secondLinkName: "Logout"
      };


      const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        setTitle("");
        setImageUrl("");
      } 

    return(
        <div className="w-full h-screen relative">
        <div className="absolute top-0 left-0 w-full z-10">
          <Header header={updateHeader} />
        </div>
      <Image 
        src="/updateBackground.jpg"
        alt="update background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />

    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-yellow-500 p-12 rounded-lg shadow-lg w-full max-w-3xl">

      <h1 className="text-5xl text-black font-bold text-center mb-6">UPDATE BOOK</h1>

      <form className="space-y-6">
        <div>
          <h2 className="text-xl text-blue-500 font-bold">New Title:</h2>
          <input
           type="text"
           id="newTitle"
           className="w-full p-2 mt-2 border border-gray-300 rounded-md text-blue-600 placeholder-black-500"
           placeholder="Enter a new title"
           value={title}
           onChange={(e) => setTitle(e.target.value)}/>

        </div>

        <div>
          <h2 className="text-xl text-blue-500 font-bold">New Image URL</h2>
          <input
           type="text"
           id="newImageUrl"
           className="w-full p-2 mt-2 border border-gray-300 rounded-md text-blue-600 placeholder-black-500"
           placeholder="Enter a new image URL"
           value={imageUrl}
           onChange={(e) => setImageUrl(e.target.value)}/>
        </div>
        <div className="m-20 flex justify-center">
          <Button type="submit" onClick={onSubmit}>Submit</Button>
        </div>
      </form>
     </div>
  </div>
</div>
    );
}