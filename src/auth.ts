import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./models/UserSchema";
import connectMongoDB from "./libs/mongodb";
 
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        console.log("Finding user with username:", credentials.username);
        try {
          await connectMongoDB();
          const user = await User.findOne({ username: credentials.username }).lean();

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              console.log("auth.ts: sign in success")
              return {
                id: user._id.toString(),
                username: user.username,
              };
            } else {
              console.log("Email or password is incorrect.");
              return null;
            }
          } else {
            console.log("User not found.");
            return null;
          }
        } catch (error: any) {
          console.log("An error occured: ", error);
          return null;
        }
      }
    })
  ]
});