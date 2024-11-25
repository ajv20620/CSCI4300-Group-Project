"use client"
import Header from "../../components/Header";
import Button from "../../components/Button";
import Image from "next/image"
import {useState, useEffect} from "react";
import {useRouter, useParams} from "next/navigation";
import { doLogout } from "@/app";


type HeaderData = {
    firstLink: string;
    firstLinkName: string;
    secondLink: string;
    secondLinkName: string;
};



export default function updatePage() {
    const [book, setBook] = useState({
        title:'',
        imageUrl:'',
    });
    const updateHeaderButtons = [
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
      }
    ];
      
      const router = useRouter();
      const params = useParams();
      const id = params?.id as string;

      useEffect(() => {
        const fetchItem = async () => {
           try {
            const response = await fetch(`/api/books/${id}`);
           if (!response.ok) {
            throw new Error('Network response was not ok');
           }
           const data = await response.json();
           const bookData = data.book;
           setBook({
            title: bookData.title || '',
            imageUrl: bookData.imageUrl || '',
           });
           } catch (error) {
            console.log('Error from UpdateItemInfo');
           }
        };

        if(id) {
            fetchItem();
        }
      }, [id]);

    

      const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/books/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(book),
            });
  
            if (!response.ok) {
              throw new Error('Failed to update book data');
            }
  
            //clear input
            setBook({
              title: '',
              imageUrl: '',
            });
  
            router.push('/library');
          } catch (error) {
            console.error('Error updating book', error);
          }
        
      } 

    return(
        <div className="w-full h-screen relative">
        <div className="absolute top-0 left-0 w-full z-10">
          <Header buttons={updateHeaderButtons}/>
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
           value={book.title}
           onChange={(e) => setBook({...book, title: e.target.value})}/>

        </div>

        <div>
          <h2 className="text-xl text-blue-500 font-bold">New Image URL</h2>
          <input
           type="text"
           id="newImageUrl"
           className="w-full p-2 mt-2 border border-gray-300 rounded-md text-blue-600 placeholder-black-500"
           placeholder="Enter a new image URL"
           value={book.imageUrl}
           onChange={(e) => setBook({...book, imageUrl: e.target.value})}/>
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