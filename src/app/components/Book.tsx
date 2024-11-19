import Image from 'next/image'
import Button from './Button';

type BookProps = {
  book: {
      imageUrl: string;
      title: string;
  };
};


export default function Book({ book }: BookProps) {
    return (
      <div className="relative shadow rounded-xl bg-blue-500 p-3 flex flex-col items-center flex-wrap w-[200px] border border-yellow-500" >
        <h1 className="text-center text-black font-serif">-{book.title}-</h1>
        <Image
          src={book.imageUrl}
          alt={book.title}
          width={150}
          height={150}
          priority
          className=''
        />
        <div className='absolute bottom-2 right-2'>
            <Image
              src={"/trashcanIcon.png"}
              alt={"delete book"}
              width={25}
              height={25}
              className="cursor-pointer"
            />
        </div>
       </div>
    );

}
