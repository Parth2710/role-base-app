"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateContact = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleButton = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch("/api/contacts/createContact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, phone, name })
            })

            const contactRes = await res.json()

            if (res.ok) {
                setError(contactRes.message)
                router.push("/contacts")
            } else {
                setError(contactRes.message)
            }
        } catch (err) {
            console.log(err)
            setError("internal server issue")
        }
    }
    return (
        <main className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg relative top-[8rem]">
            <h2 className="text-xl font-semibold mb-4">Create Contact</h2>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleButton} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        placeholder='name'
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        placeholder='email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        placeholder='phone no'
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                >
                    Add Contact
                </button>
            </form>
        </main>
    )
}

export default CreateContact