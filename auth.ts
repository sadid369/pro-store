import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "./lib/generated/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";
const prisma = new PrismaClient();
export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null; // Explicitly return null if credentials are missing
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        // Check if user exists and has a password
        if (user && user.password) {
          const isMatch =
            typeof credentials.password === "string" &&
            typeof user.password === "string" &&
            compareSync(credentials.password, user.password);
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            }; // Return a valid User object
          }
        }

        return null; // Explicitly return null if authentication fails
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;
      console.log(token);
      if (trigger === "update") {
        session.user.name = user.name; // Add role to session
      }
      return session;
    },
    async jwt({ session, user, trigger, token }: any) {
      //Assign user field to token
      if (user) {
        token.role = user.role;

        // if user has no name then use the email first part
        if (user.name === "NO_NAME") {
          user.name = user.email.split("@")[0];
        }
        // Update database to reflect the token name
        await prisma.user.update({
          where: { id: user.id },
          data: {
            name: user.name,
          },
        });
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
