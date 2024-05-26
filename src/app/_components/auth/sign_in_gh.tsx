import { signIn, auth } from "~/auth"
import { SignOut } from "./sign_out"
import Image from 'next/image'
 
export async function SignInGH() {
  const session = await auth();
  if (session) {
    return (
      <div className="pr-8">
        <div className="welcome block lg:inline-block text-white hover:text-gray-400 px-4 py-2 text-center">
          <p>{session.user?.name}</p>
        </div>
        <div className="welcome hover:text-gray-400 px-4 py-2 text-center">
          <SignOut />
        </div>
      </div>
    );
  } else {
    return (
      <form action={async () => {
        "use server";
        await signIn("github");
      }}>
        <div className="welcome block lg:inline-block text-white hover:text-gray-400 px-4">
          <button type="submit">Sign In With GitHub</button>
        </div>
      </form>
    );
  }
}
