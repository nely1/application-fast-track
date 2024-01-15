"use client"
import { signIn } from 'next-auth/react';

export function GoogleSignInButton() {
    const handleClick = () => {
      signIn("google");
    };
  
    return (
        <button type="button" onClick={handleClick} className="rounded-lg px-10 py-3 hover:bg-green-800 bg-green-700 mt-20">Sign in with Google</button> 
    );
  }
  

export default GoogleSignInButton