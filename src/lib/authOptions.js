import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./Mongodb";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true, // 👈 important
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id?.toString();
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.hasPaid = user.hasPaid ?? false;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.picture,
          hasPaid: token.hasPaid ?? false,
        };
      }
      return session;
    },

    async signIn({ user, account }) {
      try {
        const db = (await clientPromise).db("TaskMamaDB");
        const usersCol = db.collection("users");

        // check existing user by email
        const existingUser = await usersCol.findOne({ email: user.email });

        if (existingUser) {
          // link new provider if not already linked
          if (!existingUser.providers?.includes(account.provider)) {
            await usersCol.updateOne(
              { email: user.email },
              { $addToSet: { providers: account.provider } } // $addToSet prevents duplicates
            );
            console.log(
              `✅ Linked new provider [${account.provider}] to existing user ${user.email}`
            );
          }
          return true; // allow login
        }

        // new user → insert into DB
        await usersCol.insertOne({
          name: user.name,
          email: user.email,
          image: user.image,
          providers: [account.provider],
          createdAt: new Date(),
          hasPaid: false,
        });

        console.log(`🆕 New user created: ${user.email}`);
        return true;
      } catch (err) {
        console.error("❌ SignIn error:", err);
        return false;
      }
    },
  },
};
