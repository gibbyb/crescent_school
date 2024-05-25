import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Entra from "next-auth/providers/microsoft-entra-id"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,

    Entra({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
    }),

  ],
})
