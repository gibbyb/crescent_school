import Link from "next/link";
import { auth } from "~/auth";
import { db } from "~/server/db"

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await auth();
  if (!user) {
    return (
      <main>
        <div className="w-full text-3xl text-center">Welcome to the New Dashboard for Crescent Staff</div>
        <div className="w-full text-4xl text-center">Please Sign In</div>
      </main>
    );
  } else {
    const students = await db.query.Students.findMany({
      orderBy: (model, {desc}) => desc(model.id),
    });
    return (
      <main>
        <div className="flex flex-wrap gap-4">
          {[...students].map((Student, index) => (
          <div key={Student.id + '-' + index} className="text-xl">
            {Student.first_name} {Student.last_name}
          </div>
          ))}
        </div>
      </main>
    );
  }
}
