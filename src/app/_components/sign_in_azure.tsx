import { signIn } from "~/auth"
 
export function SignInAZURE() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("microsoft-entra-id")
      }}
    >
      <button type="submit">Sign In with Microsoft</button>
    </form>
  )
} 
