import nextAuthImport from 'next-auth';
import googleProviderImport from 'next-auth/providers/google';
import credentialsProviderImport from "next-auth/providers/credentials";
import { db } from '../../db';
import { validateEmail } from '../email/login/validate_email';

const GoogleProvider = googleProviderImport.default;
const CredentialsProvider = credentialsProviderImport.default;
const NextAuth = nextAuthImport.default;
// console.log('secret is', process.env.GOOGLE_CLIENT_SECRET);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "email", type: "text",},
      },
      async authorize(credentials/*, req*/) {
        try {
          const result = await validateEmail(credentials.email);
          const {success, username, email} = result;
          const user = {email: email, name: username};
          // console.log(response);
          if (success) {
            // console.log('login sucess');
            return user;
          }
        } catch (e) {
          console.log(e);
          return null;
        }
        
        return null;
      }
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
    async jwt({ token, user}) {
      if (user) {
        const result = await db.query('SELECT username FROM blog_user WHERE email=$1;',
          [user.email],
        );
        token.username = result.rows[0]?.username;
      }
      return token;
    },
    async session({ session, token}) {
      session.user.name = token.username;
      return session;
    },
    async redirect({/*url, baseUrl*/}) {
      return '/';
    }
  }
});

export { handler as GET, handler as POST };