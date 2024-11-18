import Book from './Book';

type BookData = {
    title: string;
    imageUrl: string;
}

interface BooksProps {
    books: BookData[];
}

export default function Books({books}: BooksProps) {
    return(
        <div className="flex flex-wrap gap-4">
            {books.map((book,index) => (
            <Book key={index} book={book}/>
            ))}
        </div>  
    );
}
