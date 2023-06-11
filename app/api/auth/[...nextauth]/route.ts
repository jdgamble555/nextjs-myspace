import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/app/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next/types';

export const authOptions: NextAuthOptions = {

    secret: process.env.NEXTAUTH_SECRET!,
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        })
    ]
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, authOptions);
}

export { handler as GET, handler as POST };