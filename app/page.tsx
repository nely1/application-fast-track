import Image from 'next/image'

import {signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getUserSession } from '@/lib/session';
import { GET } from './api/auth/[...nextauth]/route';
import {GoogleSignInButton} from '../components/GoogleSignInButton';
import {SignOutButton} from '../components/SignOutButton';

// this is the login page
export default async function Home() {

  const session = await getServerSession();
  
  if (session?.user) {
    redirect('/table');
  }

  return (

   
    <main className="flex min-h-screen flex-col items-center p-24">
       {/* {session ? (<p>{JSON.stringify(session?.user)}</p>) : (<p>Please log in to access more features.</p>)} */}
      <Image
              src="/logo.svg"
              alt="NES Logo"
              className="dark:invert"
              width={180}
              height={100}
              priority
            />
    
      <GoogleSignInButton/>

    </main>
  )
}
