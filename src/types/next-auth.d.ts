import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        firstName?: string;
        lastName?: string;
        name?: string
        role: "ADMIN" | "USER"
    }

    interface Session {
        user: {
            id: string;
            firstName?: string;
            lastName?: string;
            email?: string;
            image?: string;
            name?: string
            role: "ADMIN" | "USER"
        };
    }

    interface JWT {
        id: string;
        firstName?: string;
        lastName?: string;
        name?: string
        role: "ADMIN" | "USER"
    }
}
