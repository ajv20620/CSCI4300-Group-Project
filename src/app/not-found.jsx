"use client"
import Button from "./components/Button";
import Image from "next/Image"
import { useRouter } from "next/navigation"


export default function notFound() {
    
    const router = useRouter();
    const handleClick = () => {
    router.push('/');
  }
    return(
        <div className="flex flex-col justify-center items-center space-y-10">
            <h1 className="font-serif text-5xl">PAGE NOT FOUND 404</h1>
            <div className="flex items-center">
               <Button
                type="button"
                onClick={handleClick}>
                  <div className="flex items-center space-x-2 m-5">
                    <h1 className="font-serif font-bold text-3xl">Librium</h1>
                    <Image
                      className=""
                      src="/bookIcon.png"
                      alt="bookIcon"
                      width={50}
                      height={50}
                    />
                  </div>
              </Button>
            </div>
        </div>
    );

}

