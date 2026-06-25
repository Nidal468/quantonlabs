
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import connectMongo from "./db/mongoose";
import { User } from "./model/user";

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
        await connectMongo();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const email = credentials.email.toLowerCase().trim();
        const password = credentials.password;

        let user = await User.findOne({ email });

        if (!user) {
          // Auto-create user for credential login
          const hashedPassword = await bcrypt.hash(password, 12);
          const username = email.split("@")[0];

          try {
            user = await User.create({
              email,
              password: hashedPassword,
              username,
              role: "user",
              companies: [],
            });
          } catch (error) {
            // Handle MongoDB duplicate key race conditions
            if ((error as { code?: number }).code === 11000) {
              throw new Error("Email already registered");
            }
            throw new Error("Failed to create account");
          }
        } else {
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid email or password");
          }
        }

        // Return user in NextAuth expected format
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
      if (account?.provider === "google") {
        await connectMongo();

        let dbUser = await User.findOne({
          email: user.email?.toLowerCase(),
        });

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
  },

  session: {
    strategy: "jwt",
  },
};
