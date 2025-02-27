import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest) {
    const session = await auth()
    const prisma = new PrismaClient

    if (!session) {
        return NextResponse.json({ message: "session does not exist" })
    }

    try {
        const { id } = await req.json()

        const contact = await prisma.contact.findUnique({
            where: { id }
        })

        if (!contact) {
            return NextResponse.json({ message: "contact not found" })
        }

        // && session.user.id !== contact.userId
        if (session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" })
        }

        const deletedContact = await prisma.contact.delete({
            where: { id },
        })

        return NextResponse.json({ message: "contact has been deleted", deletedContact })
    } catch (err) {
        return NextResponse.json({ message: "failed to delete a contact" })
    }
}