import { signIn, auth } from "~/auth"
import { SignOut } from "./sign_out"
 
export async function SignInGH() {
  const session = await auth()
  if (session) {
    return (
      <div>
        <p>{session.user?.name}</p>
        <SignOut />
      </div>
    )
  } else {
    return (
      <form
        action={async () => {
          "use server"
          await signIn("github")
        }}
      >
        <button type="submit">Sign In with GitHub</button>
      </form>
    )
  }
} 
