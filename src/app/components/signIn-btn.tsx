"use client";
import { googleLogin, githubLogin } from "@/lib/actions/auth";

export const SignInButton = () => {
    return <button type="button" onClick={() => githubLogin()}> Sign In With Github</button>;
};

export const GoogleSignInButton = () => {
    return <button type="button" onClick={() => googleLogin()}> Sign In With Google</button>;
};