import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    AzureADProvider({
        clientId: process.env.AZURE_AD_CLIENT_ID,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
        tenantId: process.env.AZURE_AD_TENANT_ID,
      }),
    // ...add more providers here
  ],
  secret:process.env.SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      session.error = token.error

      return session
    }
  }
}
export default NextAuth(authOptions)