import { signIn } from "~/auth";

export async function SignInAZURE() {
  return (
    <form className="w-full"
      action={async () => {
        "use server";
        await signIn("microsoft-entra-id");
      }}>
      <button type="submit" className="w-full">Sign In with Microsoft</button>
    </form>
  );
}
