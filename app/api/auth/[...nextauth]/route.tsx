import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import prisma from "@/prisma/client";
import { session } from "@/lib/session";

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

const handler = NextAuth(authOption)
export {handler as GET, handler as POST}