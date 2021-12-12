import NextAuth from 'next-auth';
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
          .then((res) => res.data);
        if (!data.access_token) {
          return null;
        }
        return { token: data.access_token };
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
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
