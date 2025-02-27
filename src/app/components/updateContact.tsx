"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface UpdateType {
    id: string,
    phone: string,
    email: string,
    name: string,
}
const UpdateContact: React.FC<UpdateType> = ({ id, phone: initPhone, email: initEmail, name: initName }) => {
    const router = useRouter()

    const [phone, setPhone] = useState(initPhone)
    const [email, setEmail] = useState(initEmail)
    const [name, setName] = useState(initName)
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch("/api/contacts/updateContact", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, phone, email, name })
            })

            const errorResponse = await res.json();

            if (res.ok) {
                alert(errorResponse.message);
            } else {
                alert("error during updating a contact")
            }
            router.refresh()
        } catch (err) {
            console.log(err)
            alert("Failed to update the post. Please try again.");
        }
    }
    return (
        <main>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">Update Contact</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit post</DialogTitle>
                        <DialogDescription>
                            Make changes to your post here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    name
                                </Label>
                                <Input id="title" value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="content" className="text-right">
                                    phone
                                </Label>
                                <Input id="content" value={phone} onChange={e => setPhone(e.target.value)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="content" className="text-right">
                                    email
                                </Label>
                                <Input id="content" value={email} onChange={e => setEmail(e.target.value)} className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </main>
    )
}

export default UpdateContact