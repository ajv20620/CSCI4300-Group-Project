import Book from './Book';

type BookData = {
    _id: string;
    title: string;
    imageUrl: string;
}

interface BooksProps {
    books: BookData[];
    onDelete: (id: string) => void;
    onUpdate: (id: string) => void;
    onRead: (id: string) => void;
}

export default function Books({books, onDelete, onUpdate, onRead}: BooksProps) {
    return(
        <div className="flex flex-wrap gap-4">
            {books.map((book,index) => (
            <Book key={index} book={book} onDelete={onDelete} onUpdate={onUpdate} onRead={onRead}/>
            ))}
        </div>
    );
}
