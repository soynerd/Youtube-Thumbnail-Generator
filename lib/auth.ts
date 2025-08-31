// lib/auth.ts

import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const client = new PrismaClient();
const adapter = new PrismaAdapter(client.Session, client.User);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: false
        },
    },
    getUserAttributes: (attributes) => {
        return {
            name: attributes.name,
            email: attributes.email,
        };
    },
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    name: string | null;
    email: string;
}