"use client";
import Image from "next/image"
import Header from "../components/Header";
import Button from "../components/Button";
import { useState } from "react";

type HeaderData = {
    firstLink: string;
    firstLinkName: string;
    secondLink: string;
    secondLinkName: string;
};

export default function Signup() {

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const signupHeader: HeaderData = {
        firstLink: "/",
        firstLinkName: "Home",
        secondLink: "/login",
        secondLinkName: "Already have an account?"
    }

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newUser = {
            usernameInput,
            passwordInput
        }
        console.log("Username: " + newUser.usernameInput);
        console.log("Password: " + newUser.passwordInput);

        if (!newUser.usernameInput || !newUser.passwordInput) {
          console.log("Username and password required.");
        } else {
          try {
            const postResponse = await fetch("http://localhost:3000/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Specify JSON content type
              },
              body: JSON.stringify(newUser), // Convert the object to a JSON string
            });
            if (postResponse.ok) {
              const result = await postResponse.json();
              
            }
          } catch (err) {

          }
        }
        
        setUsernameInput("");
        setPasswordInput("");
    }

    
    return(
        <div className="w-full h-screen relative">
            <div className="absolute top-0 left-0 w-full z-10">
              <Header header={signupHeader}/>
            </div>
            <Image
              src="/signupPic.jpg"
              alt="signup background"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-yellow-500 p-12 rounded-lg shadow-lg w-full max-w-3xl">

                <h1 className="text-5xl text-black font-bold text-center mb-6">SIGNUP</h1>

                  <form className="space-y-6">
                    <div>
                      <h2 className="text-xl text-blue-500 font-bold">Username</h2>
                      <input
                        type="text"
                        id="username"
                        className="w-full p-2 mt-2 border border-gray-300 rounded-md text-blue-600 placeholder-black-500"
                        placeholder="Enter a username."
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}/>
                    </div>
                    <div>
                      <h2 className="text-xl text-blue-500 font-bold">Password</h2>
                      <input
                        type="text"
                        id="passsword"
                        className="w-full p-2 mt-2 border border-gray-300 rounded-md text-blue-600 placeholder-black-500"
                        placeholder="Enter a password"
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