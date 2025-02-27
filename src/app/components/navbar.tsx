import Link from 'next/link';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from '@/auth';
import { SignInButton } from './signIn-btn';
import { SignOutButton } from './signOut-btn';


const Navbar = async () => {

    const session = await auth()
    return (
        <section className="w-full h-[6rem] bg-black text-white flex items-center sticky top-0 z-50">
            <div className="flex justify-between w-full">
                <div className="ml-[2rem]">
                    <Link href="/homePage">
                        <h3 className="font-bold text-2xl">TrendyStitch</h3>
                    </Link>
                </div>

                <div className="flex gap-[3rem]">
                    <div>
                        <Link href="/contacts">
                            <h3 className="font-bold text-2xl">Contacts</h3>
                        </Link>
                    </div>
                    <div>
                        <Link href="/createContact">
                            <h3 className="font-bold text-2xl">Add Contact</h3>
                        </Link>
                    </div>
                    {
                        session?.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="text-white text-2xl font-bold mr-[2rem]">
                                    Dashboard
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel className="font-extrabold text-[1rem]">My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <span>
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                <AvatarFallback>{session.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                        </span>
                                        <span className="font-semibold text-xl">{session.user.name}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className='text-red-600 text-xl font-bold ml-[10px]'>
                                            <SignOutButton />
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div>
                                <SignInButton />
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default Navbar;
