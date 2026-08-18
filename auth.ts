import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import connectMongo from "./db/mongoose";
import { User } from "./model/user";

/**
 * ACCESS CONTROL
 *
 * The Quanton OS workspace is not open for public registration.
 * Only email addresses listed in ALLOWED_EMAILS may authenticate.
 *
 * Set in .env.local and in the Vercel project environment variables:
 *   ALLOWED_EMAILS=ryan@quantonlabs.com,growth@quantonlabs.com
 *
 * If ALLOWED_EMAILS is empty or unset, all sign-in attempts are denied.
 * This fails closed by design: a missing variable must never grant access.
 */
const allowedEmails = (process.env.ALLOWED_EMAILS ?? "")
  .split(",")
  .map(e => e.trim().toLowerCase())
  .filter(Boolean);

function isAllowed(email?: string | null): boolean {
  if (!email) return false;
  if (allowedEmails.length === 0) return false;
  return allowedEmails.includes(email.toLowerCase().trim());
}

export const config: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const email = credentials.email.toLowerCase().trim();

        // Gate before any database work.
        if (!isAllowed(email)) {
          throw new Error("Access denied");
        }

        await connectMongo();

        const user = await User.findOne({ email });

        // No auto-provisioning. Unknown accounts are rejected.
        if (!user) {
          throw new Error("Access denied");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Access denied");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          image: user.avatarUrl || null,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Applies to every provider, including Google.
      if (!isAllowed(user.email)) {
        return false;
      }

      if (account?.provider === "google") {
        await connectMongo();

        let dbUser = await User.findOne({
          email: user.email?.toLowerCase(),
        });

        // Record is created only for an already-allowlisted address.
        if (!dbUser) {
          dbUser = await User.create({
            username:
              user.name ||
              user.email?.split("@")[0] ||
              `user_${Date.now()}`,
            email: user.email!.toLowerCase(),
            avatarUrl: user.image || "",
            role: "user",
            companies: [],
          });
        }

        user.id = dbUser._id.toString();
      }

      return true;
    },

    async jwt({ token, user }) {
      await connectMongo();

      if (user?.email) {
        const dbUser = await User.findOne({
          email: user.email.toLowerCase(),
        });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.email = dbUser.email;
        }
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id as string,
          email: token.email as string,
        },
      };
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },

  session: {
    strategy: "jwt",
  },
};