"use client";
import Image from "next/image";
import Header from "../components/Header";
import Button from "../components/Button"
import { useState } from "react";
import { doCredentialLogin } from "..";
import {useRouter} from "next/navigation";
import { doLogout } from "..";


export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginHeaderButtons = [
      {
        label: "Sign Up",
        onClick: () => router.push("/signup"),
      },
      {
        label: "Cancel",
        onClick: () => router.push("/"),
      },
    ];

    const onSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const user = {
          username,
          password
      }
      console.log("Username: " + user.username);
      console.log("Password: " + user.password);

      if (!user.username || !user.password) {
          console.log("Username and password required.");
      } else {
        const form = new FormData();
        form.append("username", user.username);
        form.append("password", user.password);
        try {
          const response = await doCredentialLogin(form);
  
          if (!response.error) {
            router.push("/library")
            console.log("Sign-in successful!");
        } else {
            console.error("Sign-in failed:", response.error);
        }
      } catch (err) {
          console.error("An unexpected error occurred:", err);
      }
      }
      
      setUsername("");
      setPassword("");
    } 

    return(

      <div className="w-full h-screen relative">
        <div className="absolute top-0 left-0 w-full z-10">
          <Header buttons={loginHeaderButtons} />
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
           value={username}
           onChange={(e) => setUsername(e.target.value)}/>

        </div>

        <div>
          <h2 className="text-xl text-blue-500 font-bold">Password</h2>
          <input
           type="password"
           id="password"
           className="w-full p-2 mt-2 border border-gray-300 rounded-md text-blue-600 placeholder-black-500"
           placeholder="Enter your password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}/>
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