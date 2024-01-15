"use client"

import Image from 'next/image'

import {signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// this is the login page
export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    const user = signIn("google");
    
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Image
              src="/logo.svg"
              alt="NES Logo"
              className="dark:invert"
              width={180}
              height={100}
              priority
            />
      <button type="button" onClick={handleClick} className="rounded-lg px-10 py-3 hover:bg-green-800 bg-green-700 mt-20">Sign in with Google</button> 
      

    </main>
  )
}
