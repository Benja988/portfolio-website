// app/api/auth/[...nextauth].ts

import NextAuth, { NextAuthOptions, AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb'; // Adjust path based On your structure
import User, { IUser } from '@/models/User'; // Adjust path, ensure Mongoose model
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import mongoose from 'mongoose';

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials | undefined, req): Promise<any | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        try {
          await connectToDatabase(); // Ensure connection is established
          const user: IUser | null = await User.findOne({ email: credentials.email }).exec();

          if (!user) {
            throw new Error('User not found');
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Invalid password');
          }

          return { id: user._id.toString(), name: user.name, email: user.email };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(Promise.resolve(mongoose.connection)), // Use MongoDB adapter
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);