"use client";
import {useState, useEffect} from "react";
import Link from 'next/link';
import Header from '../components/Header'
import Book from '../components/Book';
import Books from '../components/Books'
import {useRouter} from 'next/navigation';
import Button from "../components/Button";
import { doLogout } from "..";
import EpubRenderer from "../components/EpubRenderer";

type renderStatus = "none" | "example1"

type book = {
  _id: string;
  title: string;
  imageUrl: string;
}

/*
const BOOKS_INIT: book[] = [
    { 
      title: "Harry Potter",
      imageUrl: "https://m.media-amazon.com/images/I/81DI+BAN2SL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      
      title: "To Kill a Mockingbird",
      imageUrl:"https://m.media-amazon.com/images/I/81aY1lxk+9L._AC_UF1000,1000_QL80_.jpg"
    },
    {
     
      title: "The Great Gatsby",
      imageUrl:"https://m.media-amazon.com/images/I/61OTNorhqVS._AC_UF894,1000_QL80_.jpg"
    },

    // Book of the New Sun
    // https://m.media-amazon.com/images/I/91RoFyMfEGL._AC_UF1000,1000_QL80_.jpg
];
*/

export default function Library() {
  
  const router = useRouter();

  const [status, setStatus] = useState<renderStatus>("none");

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
      }
    },
  ];


    const [books, setBooks] = useState([]);
    
    const fetchBooks = async () => {
      try {
          const response = await fetch('api/books');
          if (!response.ok) {
              throw new Error('Network response was not okay');
          }
          const data = await response.json();
          setBooks(data.books);
      } catch (error) {
          console.log('Error from Books:',error);
      }
    };

    //Get all books from MongoDB
      useEffect(() => {
          fetchBooks();
      }, []);

      //Deleting book then get all books again to immediately rerender
      const handleDelete = async (id: string) => {
        try {
          const response = await fetch(`/api/books/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('network response was not ok');
          }
          fetchBooks();
        } catch (error) {
          console.log('Error in ShowItemDetails_deleteClick')
        }
      
      };

      const handleUpdate = async (id: string) => {
        console.log("update");
        router.push(`/update-book/${id}`);
      }

      const onSubmit = async (event: React.FormEvent) => {
        doLogout();
      } 
      
      const onBookSelect = (event: React.FormEvent) => {
        setStatus("example1");
        if (status === "example1"){
          setStatus("none");
        }
      }


  return (
    <div className="w-screen h-screen bg-yellow-500">
        <Header buttons={libraryHeaderButtons}></Header>
        <div className="flex justify-center m-10">
        {/* Conditional rendering for books */}
        {books.length === 0 ? (
          <div className="text-xl font-semibold">There's no books in your library. Add one to get started!</div>
        ) : (
          <Books books={books} onDelete={handleDelete} onUpdate={handleUpdate} />
        )}
        </div>

        <div className="flex justify-center m-10">
          <Button type="button" onClick={onBookSelect}>Read</Button>
        </div>
      
          <div className = {`h-[600] w-[600] ${status === "example1" ? "opacity-100 visible" : "opacity-0 invisible"}`} >
          <EpubRenderer epubPath="/uploads/example1.epub"></EpubRenderer> </div>
        
      
        <div className="m-20 flex justify-center">
          <Button type="submit" onClick={onSubmit}>Logout</Button>
        </div>
    </div>
      
    
  );
};

