import Image from 'next/image'
import Button from './Button';

type BookProps = {
  book: {
      _id: string;
      imageUrl: string;
      title: string;
  };
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
};


export default function Book({ book, onDelete, onUpdate}: BookProps) {
    return (
      <div className="relative shadow rounded-xl bg-blue-500 p-3 flex flex-col items-center flex-wrap w-[200px] border border-yellow-500" >
        <div className="flex justify-between items-center w-full mb-4">
          <h1 className="text-black font-serif">-{book.title}-</h1>
          <button className='flex-shrink-0' onClick={() => onUpdate(book._id)}>
            <Image
              src={"/updateIcon.png"}
              alt={"update book"}
              width={25}
              height={25}
              className="cursor-pointer"
             />
          </button>
        </div>
        <Image
          src={book.imageUrl}
          alt={book.title}
          width={150}
          height={150}
          priority
          className=''
        />
        <button className='absolute bottom-2 right-2' onClick={() => onDelete(book._id)}>
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
