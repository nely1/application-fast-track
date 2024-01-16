"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react";
import './globals.css'
import { NextAuthProvider } from './provider';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
