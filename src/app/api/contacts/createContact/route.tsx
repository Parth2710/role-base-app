import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

    const session = await auth()
    const prisma = new PrismaClient
    if (!session) {
        return NextResponse.json({ message: "session does not exist" })
    }

    const { name, email, phone } = await req.json()

    try {
        const newContact = await prisma.contact.create({
            data: {
                name,
                phone,
                email,
                userId: session.user.id
            }
        })
        return NextResponse.json({ message: "contact has been created", newContact })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "failed to create a contact", err })
    }
}