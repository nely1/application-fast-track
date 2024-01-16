import { NextAuthOptions } from "next-auth";
import {getServerSession } from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import prisma from "@/prisma/client";
import { session } from "@/lib/session";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

const authOption: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({account, profile}) {
            if (!profile?.email) {
                throw new Error('No profile')
            }

            await prisma.company.upsert({
                where: {
                    email: profile.email,
                },
                create: {
                    email: profile.email,
                    name: profile.name,
                },
                update: {
                    name: profile.name,
                },
            })
            return true;
        },
        session,
        async jwt({token, user, account, profile}) {
            if (profile) {
                const company = await prisma.company.findUnique({
                    where: {
                        email: profile.email,
                    },
                })
                if (!company) {
                    throw new Error('No company found')
                }
                token.id = user.id
            }
            return token
        }
    }
}

export async function loginIsRequiredServer() {
    const session = await getServerSession(authOption);
    if (!session) {
        return redirect('/');
    }
}

export function loginIsRequiredClient() {
    if (typeof window !== "undefined") {
        const session = useSession();
        const router = useRouter();
        if (session.status === 'unauthenticated') return true;     
    }
}

export default authOption;