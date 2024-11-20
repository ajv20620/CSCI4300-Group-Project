import Book from './Book';

type BookData = {
    _id: string;
    title: string;
    imageUrl: string;
}

interface BooksProps {
    books: BookData[];
    onDelete: (id: string) => void;
}

export default function Books({books, onDelete}: BooksProps) {
    return(
        <div className="flex flex-wrap gap-4">
            {books.map((book,index) => (
            <Book key={index} book={book} onDelete={onDelete}/>
            ))}
        </div>  
    );
}
