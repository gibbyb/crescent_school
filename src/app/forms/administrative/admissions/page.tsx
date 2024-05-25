import Link from "next/link";
import { db } from "~/server/db"

export const dynamic = "force-dynamic";

export default async function AdmissionsForm() {
  const students = await db.query.Students.findMany({
    orderBy: (model, {desc}) => desc(model.id),
  });
  return (
    <main className="">
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
