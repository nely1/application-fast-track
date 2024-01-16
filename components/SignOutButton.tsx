"use client"
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  
  const router = useRouter();

  const handleClick = () => {
      signOut();
      router.push('/');
    };
  
    return (
      <li><a href="/" onClick={handleClick}>Logout</a></li>
    );
  }
  

export default SignOutButton;