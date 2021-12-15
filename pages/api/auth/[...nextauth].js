import NextAuth from "next-auth";
import prisma from '../../../lib/prisma';
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    secret: process.env.SECRET,
    callbacks: {
        session: async ({session, user}) => {
          session.userId = user.id;
          return Promise.resolve(session);
        }
      }
});