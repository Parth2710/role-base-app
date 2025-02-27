"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

interface DeleteType {
    id: string
}
const DeleteContact: React.FC<DeleteType> = ({ id }) => {
    const router = useRouter()

    const handleButton = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch("/api/contacts/deleteContact", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })

            const contactRes = await res.json()

            if (res.ok) {
                alert(contactRes.message)
            } else {
                alert("error during deleting a contact")
            }
            router.refresh()
        } catch (err) {
            alert("internal server issue")
        }
    }
    return (
        <main>
            <button
                type="submit"
                className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                onClick={handleButton}
            >
                Delete Contact
            </button>
        </main>
    )
}

export default DeleteContact