import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: { username: {}, password: {} },
      authorize: async (credentials) => {
        const data = await axios
          .post('http://localhost:8080/api/v1/login', {
            username: credentials?.username,
            password: credentials?.password,
          })
          .then((res) => {
            return res.data;
          })
          .catch((err) => console.error(err));
        if (!data.access_token) {
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
        const { access_token, ...userDetails } = user;
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
      session.accessToken = token.accessToken;
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
