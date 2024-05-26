import { signIn, auth } from "~/auth";
import { SignOut } from "./sign_out";
import Image from 'next/image';

export async function SignInAZURE() {
  const session = await auth();

  if (session) {
    return (
      <div className="welcome pr-8 px-4 text-center text-white">
        <div className="block lg:inline-block hover:text-gray-400 py-2">
          {session.user?.image && (
            <Image src={session.user.image} alt="User Image" width={20} height={20} />
          )}
          <p>{session.user?.name}</p>
        </div>
        <div className="hover:text-gray-400 py-2">
          <SignOut />
        </div>
      </div>
    );
  } else {
    return (
      <form action={async () => {
        "use server";
        await signIn("microsoft-entra-id");
      }}>
        <div className="welcome block lg:inline-block hover:text-gray-400 px-4">
          <button type="submit">Sign In</button>
        </div>
      </form>
    );
  }
}
