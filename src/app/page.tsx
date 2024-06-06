import Link from "next/link";
import { auth } from "~/auth";
import { db } from "~/server/db"
import No_Session from "~/app/_components/ui/No_Session";

//export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await auth();
  const students = await db.query.Students.findMany({
    orderBy: (model, {desc}) => desc(model.id),
  });
  if (!user) {
    return (
      <No_Session />
    );
  } else {
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
