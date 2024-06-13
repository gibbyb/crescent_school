import Link from "next/link";
import { auth } from "~/auth";
import { db } from "~/server/db"
import No_Session from "~/app/_components/ui/No_Session";

//export const dynamic = "force-dynamic";
  //{[...students].map((Student, index) => (
  //<div key={Student.id + '-' + index} className="text-xl">
    //{Student.first_name} {Student.last_name}
  //</div>
  //))}

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
      <h1 className="text-4xl font-bold text-center pt-10">Welcome to the new Crescent School of Gaming & Bartending Faculty Portal</h1>
      </main>
    );
  }
}
