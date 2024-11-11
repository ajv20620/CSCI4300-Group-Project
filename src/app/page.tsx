import Image from "next/image";
import Header from "./components/Header"


export default function Home() {
  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="col-span-1">
       <Image
        src="/homeImage.jpg"
        alt="bookcases"
        width={1000}
        height={1000}
        className="w-full h-full object-cover"
       />
      </div>
      <div className="col-span-2">
       <Header></Header>
       <div className="leading-none">
        <h1 className="text-3xl font-bold text-center font-serif m-20 ">Welcome to Librium! Login or Signup to get Started!</h1>
       </div>
      </div>
    </div>
  );
}
