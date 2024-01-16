"use client"
import { signOut } from "next-auth/react";
export function SignOutButton() {
    const handleClick = () => {
      signOut();
    };
  
    return (
        <button type="button" onClick={handleClick} className="rounded-lg px-10 py-3 hover:bg-green-800 bg-green-700 mt-20">Sign out</button> 
    );
  }
  

export default SignOutButton;