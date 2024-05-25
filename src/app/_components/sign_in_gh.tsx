import { signIn } from "~/auth"
 
export function SignInGH() {
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
