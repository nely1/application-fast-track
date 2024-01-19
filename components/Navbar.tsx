"use client"
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {SignOutButton} from "@/components/SignOutButton";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function Navbar() {

  const session = useSession();

  return (
    <nav className="navbar">
      <Link href="/table" className="nav-logo">NES</Link>
        <ul className="nav-menu">
          <li><Link href="#">Home</Link></li>
          <li><Link href="#">About</Link></li>
          <li><Link href="#">Services</Link></li>
          <li><Link href="#">Contact</Link></li>
          <SignOutButton/>
         
          <li><img className="ml-auto mr-10 p-2 rounded-full" src={session?.data?.user?.image} alt="profile pic" height={50} width={50}/></li>
        </ul>
      </nav>
  )
}

export default Navbar;