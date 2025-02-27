import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, username, password, role } = await req.json()
    const prisma = new PrismaClient()

    try {
        const existingEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingEmail) {
            return NextResponse.json({ success: false, message: "an email already exists!" }, { status: 401 })
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (existingUser) {
            return NextResponse.json({ success: false, message: "user already exists!" }, { status: 401 })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashPassword,
                role: role === "ADMIN" ? "ADMIN" : "USER",
            }
        })

        return NextResponse.json({ success: true, message: "registration has been completed successfully", newUser, userId: newUser.id })
    } catch (err) {
        return NextResponse.json({ success: false, message: "registration failed" })
    }
}