import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await auth()
    const prisma = new PrismaClient

    if (!session) {
        return NextResponse.json({ message: "session does not exist" })
    }

    const { role, id } = session.user

    const contacts = await prisma.contact.findMany({
        where: role === "ADMIN" ? {} : { userId: id }
    })

    return NextResponse.json(contacts)
}