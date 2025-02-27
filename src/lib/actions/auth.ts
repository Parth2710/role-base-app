"use server"

import { signIn, signOut } from "@/auth"

export const githubLogin = async () => {
    await signIn("github", { redirectTo: "/homePage" })
}

export const googleLogin = async () => {
    await signIn("github", { redirectTo: "/homePage" })
}

export const logOut = async () => {
    await signOut({ redirectTo: "/" })
}