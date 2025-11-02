import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/github"
export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },

        async session({ session, token, user }) {
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 1000 * 60 * 60 * 24
    },
    pages: {
        error: "/error",
        signOut: "/"
    }

}