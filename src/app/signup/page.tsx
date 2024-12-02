"use client";
import Image from "next/image"
import Header from "../components/Header";
import Button from "../components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "../index";

export default function Signup() {
  const router = useRouter(); 

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signupHeaderButtons = [
      {
        label: "Already Logged In?",
        onClick: () => router.push("/library"),
      },
      {
        label: "Cancel",
        onClick: () => router.push("/"),
      },
    ];

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newUser = {
            username,
            password
        }
        console.log("Username: " + newUser.username);
        console.log("Password: " + newUser.password);

        if (!newUser.username || !newUser.password) {
          console.log("Username and password required.");
        } else {
          try {
            const postResponse = await fetch("http://localhost:3000/api/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Specify JSON content type
              },
              body: JSON.stringify(newUser), // Convert the object to a JSON string
            });
            if (postResponse.ok) {
              const result = await postResponse.json();
              const newUserForm = new FormData();
              newUserForm.append("username", newUser.username);
              newUserForm.append("password", newUser.password);
              console.log()
              const response = await doCredentialLogin(newUserForm);
              console.log("docrendentiallogin")
              if (!response.error) {
                console.log("pushing to library");
                router.push("/library");
              } else {
                console.log(response.ok + "not okay")
              }
            }
          } catch (err) {

          }
        }
        
        setUsername("");
        setPassword("");
    }

    
    return(
        <div className="w-full h-screen relative">
            <div className="absolute top-0 left-0 w-full z-10">
              <Header buttons={signupHeaderButtons}/>
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                      <h2 className="text-xl text-blue-500 font-bold">Password</h2>
                      <input
                        type="password"
                        id="passsword"
                        className="w-full p-2 mt-2 border border-gray-300 rounded-md text-blue-600 placeholder-black-500"
                        placeholder="Enter a password"
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