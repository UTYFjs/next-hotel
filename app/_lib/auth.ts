import NextAuth from "next-auth"
import Google from 'next-auth/providers/google';
// import { createGuest, getGuest } from './data-service';

const authConfig = {
  providers: [Google],
  // proviers: [
  //   Google({
  //     clientId: process.env.AUTH_GOOGLE_ID,
  //     clientSecret: process.env.AUTH_GOOGLE_SECRET,
  //   }),
  // ],
  
};

export const {
  auth, 
  handlers: {GET, POST}// 
} = NextAuth(authConfig)