"use client"
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {SignOutButton} from "@/components/SignOutButton";
import { useSession } from "next-auth/react";

export function Navbar() {

  const session = useSession();
  console.log(session); 
  return (
    <nav className="navbar">
      <a href="/table" className="nav-logo">NES</a>
        <ul className="nav-menu">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
          <SignOutButton/>
         
          <li><img className="ml-auto mr-10 p-2 rounded-full" src={session?.data?.user?.image} alt="profile pic" height={50} width={50}/></li>
        </ul>
      </nav>
  )
}

export default Navbar;