import Image from 'next/image'
import { useState } from 'react';

type BookProps = {
  book: {
      _id: string;
      imageUrl: string;
      title: string;
  };
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
  onRead: (id: string) => void;
};


export default function Book({ book, onDelete, onUpdate, onRead}: BookProps) {
  const [imageError, setImageError] = useState(false);
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  const validImageUrl =
    isValidUrl(book.imageUrl) && !imageError ? book.imageUrl : null;

    return (
      <div className="relative shadow rounded-xl bg-blue-500 p-3 flex flex-col items-center flex-wrap w-[200px] border border-yellow-500 hover:scale-105 transition-transform" >
        <div className="flex justify-between items-center w-full mb-4">
          <h1 className="text-black font-serif">-{book.title}-</h1>
          <button className='flex-shrink-0 hover:scale-105 transition-transform' onClick={() => onUpdate(book._id)}>
            <Image
              src={"/updateIcon.png"}
              alt={"update book"}
              width={25}
              height={25}
              className="cursor-pointer"
             />
          </button>
        </div>
        <button onClick={() => onRead(book._id)}>
        {validImageUrl ? (
          <Image
            src={book.imageUrl}
            alt={book.title}
            width={150}
            height={150}
            priority
            onError={() => setImageError(true)}
            className=""
          />
        ) : (
          <div className="text-red-500 font-bold">Invalid Cover URL</div>
        )}
        </button>
        <button className='absolute bottom-2 right-2 hover:scale-105 transition-transform' onClick={() => onDelete(book._id)}>
          <Image
            src={"/trashcanIcon.png"}
            alt={"delete book"}
            width={25}
            height={25}
            className="cursor-pointer"
           />
        </button>
      </div>
    );

}
