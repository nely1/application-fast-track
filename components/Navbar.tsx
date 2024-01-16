"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const logout = () => {
    signOut();
    const router = useRouter();
    router.push('/');

}
export const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/table" className="nav-logo">NES</a>
      <ul className="nav-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="/" onClick={logout}>Logout</a></li>
      </ul>
      </nav>
  )
}

export default Navbar;