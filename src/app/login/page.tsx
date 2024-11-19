"use client";
import Image from "next/image";
import Header from "../components/Header";
import Button from "../components/Button"
import { useState } from "react";
import { doCredentialLogin } from "..";

type HeaderData = {
  firstLink: string;
  firstLinkName: string;
  secondLink: string;
  secondLinkName: string;
};



export default function Login() {

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const loginHeader: HeaderData = {
      firstLink: "/",
      firstLinkName: "Home",
      secondLink: "/signup",
      secondLinkName: "Create Account"
    };

    const onSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const user = {
          usernameInput,
          passwordInput
      }
      console.log("Username: " + user.usernameInput);
      console.log("Password: " + user.passwordInput);

      if (!user.usernameInput || !user.passwordInput) {
        console.log("Username and password required.");
      } else {
        const form = new FormData();
        form.append(user.usernameInput, user.passwordInput);
        try {
          const response = await doCredentialLogin(form);
  
          if (response?.ok) {
              console.log("Sign-in successful!");
          } else {
              console.error("Sign-in failed:", response?.error);
          }
      } catch (err) {
          console.error("An unexpected error occurred:", err);
      }
      }
      
      setUsernameInput("");
      setPasswordInput("");
    } 

    return(

      <div className="w-full h-screen relative">
        <div className="absolute top-0 left-0 w-full z-10">
          <Header header={loginHeader} />
        </div>
      <Image 
        src= "https://www.shutterstock.com/image-photo/stack-books-against-background-library-600nw-2459213053.jpg"
        alt="login background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />

    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-yellow-500 p-12 rounded-lg shadow-lg w-full max-w-3xl">

      <h1 className="text-5xl text-black font-bold text-center mb-6">LOGIN</h1>

      <form className="space-y-6">
        <div>
          <h2 className="text-xl text-blue-500 font-bold">Username</h2>
          <input
           type="text"
           id="username"
           className="w-full p-2 mt-2 border border-gray-300 rounded-md text-blue-600 placeholder-black-500"
           placeholder="Enter your username."
           value={usernameInput}
           onChange={(e) => setUsernameInput(e.target.value)}/>

        </div>

        <div>
          <h2 className="text-xl text-blue-500 font-bold">Password</h2>
          <input
           type="text"
           id="password"
           className="w-full p-2 mt-2 border border-gray-300 rounded-md text-blue-600 placeholder-black-500"
           placeholder="Enter your password"
           value={passwordInput}
           onChange={(e) => setPasswordInput(e.target.value)}/>
        </div>
        <div className="m-20 flex justify-center">
          <Button type="submit" onClick={onSubmit}>Submit</Button>
        </div>
      </form>
     </div>
  </div>
</div>
    );
  }