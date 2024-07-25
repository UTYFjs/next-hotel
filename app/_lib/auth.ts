import NextAuth, { NextAuthConfig } from "next-auth"
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';
import email from 'next-auth/providers/email';

const authConfig = {
  providers: [Google],
  callbacks: {
    authorized({ auth, request }) {
      console.log('auth from authorized', auth);
      return !!auth?.user;
    },
    async signIn({user, account, profile}){
      try{
        const existingGuest = await getGuest(user.email)
        if(!existingGuest) await createGuest({email: user.email || '', fullName: user.name || ''}) //todo 
        return true;
      } catch {
        return false
      }
    },
    async session({session, user}){
      const guest = await getGuest( session.user.email)
      session.user.id = guest.id;
      return session
    }
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