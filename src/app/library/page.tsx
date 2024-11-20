"use client";
import {useState, useEffect} from "react";
import Link from 'next/link';
import Header from '../components/Header'
import Book from '../components/Book';
import Books from '../components/Books'




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


];
*/

type HeaderData = {
    firstLink: string;
    firstLinkName: string;
    secondLink: string;
    secondLinkName: string;
}


export default function Library() {

  const libraryHeader: HeaderData = {
    firstLink: "/add-item",
    firstLinkName: "Add Item",
    secondLink: "/",
    secondLinkName: "Logout",
    };


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
  


  return (
    <div className="bg-yellow-500">
        <Header header={libraryHeader}></Header>
        <div className="flex justify-center m-10">
        <Books books={books} onDelete={handleDelete}/>
        </div>
    </div>
      
    
  );
};

