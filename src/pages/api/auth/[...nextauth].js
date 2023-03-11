import connectDB from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import { generateHashedPassword } from "../../../utils/encryption";

const authorizeUser = (password, user) => {
  const currentHashedPassword = generateHashedPassword(user.salt, password);
  return currentHashedPassword == user.hashedPassword;
};

export const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        connectDB();
        const username = credentials.username;
        const password = credentials.password;
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("You haven't registered yet!");
        }

        if (!authorizeUser(password, user)) {
          throw new Error("Wrong password, please try again!");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // We can pass in additional information from the user document MongoDB returns
    // This could be avatars, role, display name, etc...
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user._id,
          username: user.username,
          email: user.email
        };
      }
      return token;
    },
    // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    // Here you can define your own custom pages for login, recover password, etc.
    signIn: "/user/login", // we are going to use a custom login page (we'll create this in just a second)
  },
};

export default NextAuth(authOptions);
