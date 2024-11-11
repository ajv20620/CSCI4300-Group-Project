import Book from '../components/Book';

type book = {
  title: string;
  imageUrl: string;
}

const BOOK_INIT: book = {
    title: "Harry Potter",
    imageUrl: "https://m.media-amazon.com/images/I/81DI+BAN2SL._AC_UF1000,1000_QL80_.jpg"
}





export default function itemsList() {
    return(
        <div className="flex flex-row justify-around">
          <Book book={BOOK_INIT}/>
        </div>
    );
}