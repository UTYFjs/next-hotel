import NextAuth, { NextAuthConfig } from "next-auth"
import Google from 'next-auth/providers/google';

const authConfig = {
  providers: [Google],
  callbacks: {
    authorized({ auth, request }) {
      console.log('auth from authorized', auth);
      return !!auth?.user;
    },
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;

export const {
  auth, 
  signIn,
  signOut,
  handlers: {GET, POST}  
} = NextAuth(authConfig)