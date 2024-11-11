import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return(
       <div>
        <nav className="flex justify-around space-x-4 items-center bg-blue-500 h-24" >
            {/*Group together image and heading to make "Logo"*/}
            <div className="flex items-center space-x-2">
                <h1 className="font-serif "> Librium </h1>
                <Image className="" src="/bookIcon.png" alt= "bookIcon" width={40} height={40} />
            </div>
            <Link href='/login'>Login</Link>
            <Link href='/signup'>Signup</Link>

        </nav>
       </div> 
    );
}