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
    




export default function itemsList() {
    return(
        <div className="flex justify-center">
          <Books books={BOOKS_INIT}/>
        </div>
    );
}