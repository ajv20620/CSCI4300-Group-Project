import Image from "next/image";
import Link from "next/link";

type HeaderData = {
  firstLink: string;
  firstLinkName: string;
  secondLink: string;
  secondLinkName: string;
}

interface HeaderProps {
    header: HeaderData;
}

export default function Header({header}:HeaderProps) {
    return(
       <div>
        <nav className="flex justify-around space-x-4 items-center bg-blue-500 h-24 p-5" >
            {/*Group together image and heading to make "Logo"*/}
            <div className="flex items-center space-x-2">
                <h1 className="font-serif font-bold text-2xl "> Librium </h1>
                <Image className="" src="/bookIcon.png" alt= "bookIcon" width={40} height={40} />
            </div>
            {/*<Link className="text-lg font-bold underline" href='/login'>Login</Link>
            <Link className="text-lg font-bold underline" href='/signup'>Signup</Link>*/}
            <Link className="text-lg font-bold underline" href={header.firstLink}>{header.firstLinkName}</Link>
            <Link className="text-lg font-bold underline" href={header.secondLink}>{header.secondLinkName}</Link>

        </nav>
       </div> 
    );
}