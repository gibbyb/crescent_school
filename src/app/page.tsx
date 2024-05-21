import Link from "next/link";
import { db } from "~/server/db"

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        Hello World!
      </div>
    </main>
  );
}
