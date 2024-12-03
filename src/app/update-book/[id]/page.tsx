"use client"
import Header from "../../components/Header";
import Button from "../../components/Button";
import Image from "next/image"
import {useState, useEffect, useRef} from "react";
import {useRouter, useParams} from "next/navigation";
import { doLogout } from "../../";


export default function updatePage() {
    
    const [book, setBook] = useState({
        title:'',
        imageUrl:'',
        filePath:'',
    });
    const [error,setError] = useState("");
    const updateHeaderButtons = [
      {
        label: "Cancel",
        onClick: () => router.push("/library"),
      },
      {
        label: "Logout",
        onClick: () => {
          doLogout();
        }
      },
    ];
      
      const router = useRouter();
      const params = useParams();
      const id = params?.id as string;
      const file = useRef<HTMLInputElement>(null);

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
            filePath: bookData.filePath || '',
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
          const selectedFile = file.current?.files?.[0];
          console.log("file: " + file);
          if (!book.title || !book.imageUrl || !selectedFile) {
          setError("Cannot add book. Please try again");
          return;
        }

        const bookForm = new FormData();
        bookForm.append("title", book.title);
        bookForm.append("imageUrl", book.imageUrl);
        bookForm.append("file", selectedFile);


          const response = await fetch(`/api/books/${id}`, {
              method: 'PUT',
              body: bookForm,
            });
  
            if (!response.ok) {
              throw new Error('Failed to update book data');
            }
  
            //clear input
            setBook({
              title: '',
              imageUrl: '',
              filePath: '',
            });
  
            router.push('/library');
          } catch (error) {
            console.error('Error updating book', error);
          }
          

      } 

    return(
        <div className="w-full h-screen relative">
        <div className="absolute top-0 left-0 w-full z-10">
          <Header buttons={updateHeaderButtons} />
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

        <div>
          <h2 className="text-xl text-blue-500 font-bold">New File</h2>
          <input
            type="file"
            id="file-path"
            ref={file}
            className="w-full p-2 mt-2 border text-blue-600 border-blue-300 rounded-md"
            placeholder="Select an epub file."
            />
            {/**error && <p className="text-red-600 font-bold">{error}</p>*/}
        </div>

        <div className="m-20 flex justify-center">
          <Button type="submit" onClick={onSubmit}>Submit</Button>
        </div>
        <h1 className="flex justify-center text-red-600 font-bold font-sans ">{error}</h1>
      </form>
     </div>
  </div>
</div>
    );
}