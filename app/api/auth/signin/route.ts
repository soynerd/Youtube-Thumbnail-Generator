import { lucia } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = signinSchema.parse(body);

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.hashed_password) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const passwordsMatch = await compare(password, user.hashed_password);

        if (!passwordsMatch) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        console.log("Success in login");
        const response = NextResponse.json({ success: true }, { status: 200 });

        response.cookies.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        return response;


    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error("Signin Error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}