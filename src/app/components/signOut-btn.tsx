"use client";
import { logOut } from "@/lib/actions/auth";

export const SignOutButton = () => {
    return <button onClick={() => logOut()}>Sign out</button>;
};