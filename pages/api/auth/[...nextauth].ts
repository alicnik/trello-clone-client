import NextAuth, { DefaultSession, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { axiosClient } from 'utils/api/client';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: { username: {}, password: {} },
      authorize: async (credentials) => {
        const data = await axiosClient
          .post('/login', {
            username: credentials?.username,
            password: credentials?.password,
          })
          .then((res) => {
            return res.data;
          })
          .catch((err) => console.error('Error during authorize call', err));
        if (!data.access_token) {
          console.error('No access token', data);
          return null;
        }
        return data;
      },
    }),
  ],
  secret: 'hello i am a secret',
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Getting the JWT token from API response
    async jwt(args) {
      const { user, token } = args;
      if (user) {
        const { access_token, ...userDetails } = user as User & {
          access_token: string;
        };
        token.accessToken = access_token;
        token.user = userDetails;
      }

      return token;
    },

    async session({ session, token }) {
      const customUser: {
        firstName: string;
        lastName: string;
        username: string;
      } = { ...(token.user as any) };
      session.accessToken = token.accessToken as string;
      session.user = {
        name: customUser.firstName,
        email: customUser.lastName,
        image: customUser.username,
      };
      session.expires = String(token.exp);
      return session;
    },
  },
});
