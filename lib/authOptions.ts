import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prismaClient";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.Google_CLient_ID!,
            clientSecret: process.env.Google_Client_Secret!,
        }),
        CredentialsProvider({
            name: "Local Auth",
            credentials: {
                email: { type: "email", label: "Email", placeholder: "you@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email && !credentials?.password) throw new Error("Missing Email or Password")
                try {
                    const userDetails = await prisma.user.findUnique({
                        where: { email: credentials?.email }
                    })
                    if (!userDetails) {
                        throw new Error("No user found");
                    }

                    const isPasswordValid = await bcrypt.compare(credentials!.password, userDetails.hashed_password);
                    if (isPasswordValid) {
                        return { id: userDetails.id, name: userDetails.name, email: credentials?.email }
                    } else {
                        return null
                    }

                } catch (error) {
                    console.error("Provider :: Credetails :: authorize ", error);
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token
        },

        async session({ session, token }) {
            if (session.user) session.user.id = token.id as string;
            return session
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 1000 * 60 * 60 * 24
    },
    pages: {
        error: "/error",
        signOut: "/"
    },
    secret: process.env.NEXTAUTH_SECRET,

}