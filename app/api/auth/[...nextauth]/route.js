import nextAuthImport from 'next-auth';
import googleProviderImport from 'next-auth/providers/google';
import { db } from '../../db';

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
  callbacks: {
    async signIn({user,/* account, profile*/}) {
      try {
        const result = await db.query("SELECT * FROM blog_user WHERE email=$1;",
          [user.email],
        );
        console.log('result.rows is', result.rows);
        if (result.rows.length == 0) {
          return `/login/register_username?email=${user.email}`;
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async redirect({/*url, baseUrl*/}) {
      return '/';
    }
  }
});

export { handler as GET, handler as POST };