import { PrismaClient } from '@prisma/client'
import React from 'react'
import UpdateContact from '../components/updateContact'
import DeleteContact from '../components/deleteContact'

const Contacts = async () => {
    const prisma = new PrismaClient()
    const contacts = await prisma.contact.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: true
        }
    })
    return (
        <main>
            <main className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-6 text-center">Contacts List</h2>

                {contacts.length === 0 ? (
                    <p className="text-center text-gray-500">No contacts found.</p>
                ) : (
                    <div className="space-y-4">
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition flex justify-between gap-1"
                            >
                                <div>
                                    <h3 className="text-lg font-medium">{contact.name}</h3>
                                    <p className="text-gray-600">{contact.email}</p>
                                    {contact.phone && <p className="text-gray-500">📞 {contact.phone}</p>}
                                    <p className="text-sm text-gray-400">
                                        Created by: <span className="font-semibold">{contact.user.username}</span>
                                    </p>
                                </div>
                                <div className='relative top-[7px] flex flex-col gap-1'>
                                    <UpdateContact id={contact.id} phone={contact.phone} name={contact.name} email={contact.email} />
                                    <DeleteContact id={contact.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </main>
    )
}

export default Contacts