import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import connectDb from "./db";
import User from "@/model/user.model";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    callbacks: {
        async signIn({ user, account }) {
            try {
                await connectDb();

                const existingUser = await User.findOne({
                    email: user.email,
                });

                if (!existingUser) {
                    await User.create({
                        name: user.name!,
                        email: user.email!,
                        image: user.image ?? "",
                        provider: "google",
                    });
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },

        async jwt({ token }) {
            await connectDb();

            const dbUser = await User.findOne({
                email: token.email,
            });

            if (dbUser) {
                token.id = dbUser._id.toString();
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }

            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};