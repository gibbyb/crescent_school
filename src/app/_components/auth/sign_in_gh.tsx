import { signIn, signOut, auth } from "~/auth"
import Image from "next/image";
 
export async function SignInGH() {
  const session = await auth();
  if (session) {
    return (
      <div className="">
        <form className="w-full" 
          action={async () => {
            "use server";
            signOut;
          }}>
          <button className="w-full" type="submit">
            <div className="flex flex-col">
              <Image
                className="rounded-full"
                src={session.user?.image ? session.user.image : ""}
                alt="Profile Picture"
                width={50} height={50}
              />
            </div>
          </button>
        </form>
      </div>
    );
  }
  return (
  <form className="w-full" 
    action={async () => {
      "use server";
      await signIn("github");
    }}>
    <button className="w-full" type="submit">Sign In With GitHub</button>
  </form>
  );
}
