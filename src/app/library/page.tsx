"use client";
import {useState, useEffect} from "react";
import Link from 'next/link';
import Header from '../components/Header'
import itemsList from '../itemsList/page';
import Book from '../components/Book';
import Books from '../components/Books'

type book = {
  title: string;
  imageUrl: string;
}

const BOOK_INIT: book = {
    title: "Harry Potter",
    imageUrl: "https://m.media-amazon.com/images/I/81DI+BAN2SL._AC_UF1000,1000_QL80_.jpg"
}

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
    
    
      useEffect(() => {
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
          fetchBooks();
      }, []);
  


  return (
    <div className="bg-yellow-500">
        <Header header={libraryHeader}></Header>
        <div className="flex justify-center m-10">
        <Books books={books}/>
        </div>
    </div>
      
    
  );
};

