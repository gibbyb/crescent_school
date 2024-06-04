import { searchStudents } from "~/server/db/functions/students";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "~/auth";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  if (!query || query.length < 2) {
    return NextResponse.json({ message: "Invalid or no query" }, { status: 400 });
  }
  try {
    const students = await searchStudents(query);
    if (students) {
      return NextResponse.json(students, {status: 200});
    } else {
      return NextResponse.json({ message: "No students found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
