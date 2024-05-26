import { signIn } from "~/auth"
 
export async function SignInGH() {
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
