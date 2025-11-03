import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        if (!data.email || !data.password || !data.name) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }
        if (data.password.length < 8) {
            return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
        }

        console.log("existingUser");
        let existingUser;
        try {
            existingUser = await prisma.user.findUnique({ where: { email: data.email } });
        } catch (err) {
            console.error("Error checking existing user:", err);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashed_password = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                hashed_password,
            },
        });

        return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
    } catch (error) {
        console.error("Sign Up Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
