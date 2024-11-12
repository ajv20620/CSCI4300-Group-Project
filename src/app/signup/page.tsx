"use client";
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


    const header1: HeaderData = {
        firstLink: "../login",
        firstLinkName: "Already have an account?",
        secondLink: "../",
        secondLinkName: "Cancel Sign Up"
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newUser = {
            usernameInput,
            passwordInput
        }
        console.log("Username: " + newUser.usernameInput);
        console.log("Password: " + newUser.passwordInput);
        
        setUsernameInput("");
        setPasswordInput("");
    }

    return(
        <div>
            <Header header={header1}/>
            <form className="m-20">
                <h1>Username</h1>
                <input type="text" id="username" className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Enter a username."
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}/>
                <h1>Password</h1>
                <input type="text" id="passsword" className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Enter a password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}/>x
                <div className="m-10">
                  <Button type="submit" onClick={onSubmit}>Submit</Button>
                </div>
            </form>
        </div>
    );
    
}