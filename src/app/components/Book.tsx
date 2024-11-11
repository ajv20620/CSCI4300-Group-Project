import Image from 'next/image'

type BookProps = {
  book: {
      imageUrl: string;
      title: string;
  };
};

export default function Book({ book }: BookProps) {
    return (
      <div className="shadow rounded bg-blue-100 w-300px h-300px" >
        <h1>-{book.title}-</h1>
        <Image
          src={book.imageUrl}
          alt={book.title}
          width={150}
          height={150}
          priority
        />
      </div>
    );

}
