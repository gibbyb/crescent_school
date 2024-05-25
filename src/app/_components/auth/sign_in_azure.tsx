import { signIn, auth } from "~/auth"
import { SignOut } from "./sign_out"
 
export async function SignInAZURE() {
  const session = await auth()
  if (session) {
    return (
      <div>
        <div className="welcome block lg:inline-block text-white hover:text-gray-400 px-4">
          <p>{session.user?.name}</p>
        </div>
        <div className="welcome hover:text-gray-400 px-4">
        <SignOut />
        </div>
      </div>
    )
  } else {
    return (
      <form
        action={async () => {
          "use server"
          await signIn("microsoft-entra-id")
        }}
      >
        <div className="welcome block lg:inline-block text-white hover:text-gray-400 px-4">
        <button type="submit">Sign In with Microsoft</button>
        </div>
      </form>
    )
  }
} 
