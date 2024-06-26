import { searchStudentsByName } from "~/server/db/functions/students";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "~/auth";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  };
  const { searchParams } = new URL(request.url);
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');

  if (!firstName || !lastName) {
    return NextResponse.json({ message: 'First name and last name are required' }, { status: 400 });
  }
  try {
    const student = await searchStudentsByName(firstName, lastName);
    if (student) {
      return NextResponse.json(student, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Student not found. No big deal.' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
