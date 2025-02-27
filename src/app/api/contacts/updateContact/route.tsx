import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest) {
    const session = await auth()
    const prisma = new PrismaClient

    if (!session) {
        return NextResponse.json({ message: "session does not exist" })
    }
    try {
        const { id, name, phone, email } = await req.json()

        const contact = await prisma.contact.findUnique({
            where: { id }
        })

        if (!contact) {
            return NextResponse.json({ message: "contact not found" })
        }

        if (session.user.role !== "ADMIN" && session.user.id !== contact.userId) {
            return NextResponse.json({ message: "Unauthorized" })
        }

        const updatedContact = await prisma.contact.update({
            where: { id },
            data: {
                name,
                phone,
                email
            }
        })

        return NextResponse.json({ message: "contact has been updated", updatedContact })
    } catch (err) {
        return NextResponse.json({ message: "failed to update a contact" })
    }
}