'use client'
import './style.css'
import { NextAuthProvider } from '../provider';
import { signOut } from 'next-auth/react';
import {Navbar} from '@/components/Navbar';
const layout = ({children} :any) => {

  return (

      <main suppressHydrationWarning={true}>
      <Navbar/>
      {children}
      </main>
    
  )
}

export default layout
