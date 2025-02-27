import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";

const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };

                const user = await prisma.user.findUnique({
                    where: { username },
                });

                if (!user) {
                    throw new Error("No user found with this username");
                }

                const isValid = await bcrypt.compare(password, user.password!);
                if (!isValid) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.username,
                    role: user.role,

                };
            },
        }),
    ],

    session: {
        strategy: "jwt"
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                session.user.role = token.role as "ADMIN" | "USER"
            }
            return session
        }
    },
})