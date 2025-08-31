// lib/getUser.ts
import { cookies } from "next/headers";
import { lucia } from "./auth";

export async function getUser() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return null;

    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) return null;
    return user;
}
