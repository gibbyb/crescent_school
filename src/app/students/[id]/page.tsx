import { auth } from "~/auth";
import { getStudentByID, getStudentAddressByID } from "~/server/db/functions/students";
import No_Session from "~/app/_components/ui/No_Session";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const student = await getStudentByID(parseInt(params.id));
  const address = await getStudentAddressByID(parseInt(params.id));

  if (!session?.user) {
    return <No_Session />;
  }
  return (
    <main>
    <div className="w-2/3 mx-auto items-center text-center">
      <h1 className="text-xl">
        {student ? `${student.first_name} ${student.last_name}` : "Student not found"}
      </h1>
      <div className="flex flex-row">
        <div className="flex flex-col p-10">
          Address:
          <div>
            {address?.address1}
          </div>
          <div>
            {address?.address2}
          </div>
          <div>
            {address?.city}, {address?.state} {address?.zip}
          </div>
        </div>
        <div className="flex flex-col p-10">
          Phone Number: {student?.phone_number}
        </div>
      </div>
    </div>
    </main>
  );
}
