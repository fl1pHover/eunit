import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
    }),
  ],
  secret: process.env.SECRET,
});
