// app/api/logout/route.ts
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(lucia.sessionCookieName)?.value;

    if (sessionId) {
        await lucia.invalidateSession(sessionId);
    }

    const blankSessionCookie = lucia.createBlankSessionCookie();

    return new Response(null, {
        status: 200,
        headers: {
            "Set-Cookie": `${blankSessionCookie.name}=${blankSessionCookie.value}; ${Object.entries(
                blankSessionCookie.attributes
            )
                .map(([k, v]) => (v === true ? k : `${k}=${v}`))
                .join("; ")}`
        }
    });
}
