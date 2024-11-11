import Image from 'next/image'

type BookProps = {
    book: {
        imageURl: string;
        title: string;
        pages: number;
    };
};

export default function Book(book: BookProps) {
    return (
      <div className="shadow rounded " >

      </div>
    );


}
