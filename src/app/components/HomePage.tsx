'use client';

import Image from "next/image";
import Header from "./Header";
import { useRouter } from "next/navigation";
import { auth } from "../../auth"

export default function HomeClient({ session }: { session: any }) {
  const router = useRouter();

  // Buttons for logged-in and logged-out users
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
      <div className="md:col-span-2">
        <Header buttons={session ? loggedInHeaderButtons : loggedOutHeaderButtons} />
        <div className="leading-none flex items-center justify-center">
          <h1 className="text-5xl font-bold text-center font-serif m-20">
            {session
              ? `Welcome back, ${session?.user?.name || "User"}!`
              : "-Welcome to Librium! Login or Signup to get Started!-" }
          </h1>
        </div>
      </div>
    </div>
  );
}