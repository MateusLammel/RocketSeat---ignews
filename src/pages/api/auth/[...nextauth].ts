import { query } from "faunadb";
import NextAuth, { Account, Profile, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";
import { Params } from "next/dist/server/router";
import { fauna } from "../../../services/fauna";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        await fauna.query(
          query.If(
            query.Not(
              query.Exists(
                query.Match(
                  query.Index("user_by_email"),
                  query.Casefold(user.email!)
                )
              )
            ),
            query.Create(query.Collection("users"), { data: { email } }),
            query.Get(
              query.Match(
                query.Index("user_by_email"),
                query.Casefold(user.email!)
              )
            )
          )
        );
        return true;
      } catch {
        return false;
      }
    },
  },
});
