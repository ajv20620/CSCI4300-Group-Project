'use client';

import Image from "next/image";
import Header from "./Header";
import { useRouter } from "next/navigation";

export default function HomePage({ session }: { session: any }) {
  const router = useRouter();

  const loggedInHeaderButtons = [
    {
      label: `Hello ${session?.user?.username || "User"}! Click here to go to your library.`,
      onClick: () => router.push("/library"),
    },
  ];

  const loggedOutHeaderButtons = [
    {
      label: "Login",
      onClick: () => router.push("/login"),
    },
    {
      label: "Signup",
      onClick: () => router.push("/signup"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen bg-yellow-500">
      <div className="md:col-span-1">
        <Image
          src="/homeImage.jpg"
          alt="Bookshelves full of books in a library"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="md:col-span-2 flex flex-col">
        <Header buttons={session ? loggedInHeaderButtons : loggedOutHeaderButtons} />
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-center font-serif m-20">
            {session
              ? `Welcome back, ${session?.user?.username || "User1"}!`
              : "-Welcome to Librium! Login or Signup to get Started!-" }
          </h1>
          <Image
            src="/welcomeImage.png" 
            alt="Welcome"
            width={400} 
            height={200}
            className=""/>
        </div>
      </div>
    </div>
  );
}
