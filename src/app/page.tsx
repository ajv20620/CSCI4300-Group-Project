import Image from "next/image";
import Header from "./components/Header"

type HeaderData = {
  firstLink: string;
  firstLinkName: string;
  secondLink: string;
  secondLinkName: string;
}

export default function Home() {
  const homeHeader = {
    firstLink: "/login",
    firstLinkName: "Login",
    secondLink: "/signup",
    secondLinkName: "Signup",
  };
  
  return (
    <div className="grid grid-cols-3 h-screen bg-yellow-500">
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
       <Header header={homeHeader}></Header>
       <div className="leading-none flex items-center justify-center">
        <h1 className="text-5xl font-bold text-center font-serif m-20">-Welcome to Librium! Login or Signup to get Started!-</h1>
       </div>
      </div>
    </div>
  );
}
