"use client";
import Image from "next/image";
import Header from "../components/Header";

export default function Login() {

    return(

      <div className="w-full h-screen relative">

      <Image 
        src= "https://www.shutterstock.com/image-photo/stack-books-against-background-library-600nw-2459213053.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
      />

    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-yellow-500 p-12 rounded-lg shadow-lg w-full max-w-3xl">

      <h1 className="text-5xl text-black font-bold text-center mb-6">LOGIN PAGE</h1>

      <form className="space-y-6">
        <div>
          <h2 className="text-xl text-blue-500 font-bold">Username</h2>
          <input type="text" id="username" className="w-full p-2 mt-2 border border-gray-300 rounded-md text-blue-600 placeholder-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div>
          <h2 className="text-xl text-blue-500 font-bold">Password</h2>
          <input type="text" id="password" className="w-full p-2 mt-2 border border-gray-300 rounded-md text-blue-600 placeholder-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <button type="submit" className="w-full p-3 bg-blue-500 font-bold rounded-md hover:bg-blue-600">LOGIN</button>
      </form>
     </div>
  </div>
</div>
    );
  }