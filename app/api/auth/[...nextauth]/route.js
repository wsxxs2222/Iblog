import nextAuthImport from 'next-auth';
import googleProviderImport from 'next-auth/providers/google';
const GoogleProvider = googleProviderImport.default;
const NextAuth = nextAuthImport.default;
// console.log('secret is', process.env.GOOGLE_CLIENT_SECRET);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };