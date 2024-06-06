import "server-only";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { eq, and, ilike, or } from "drizzle-orm";

export const searchStudentsByName = async (first_name: string, last_name: string) => {
  return await db.select().from(schema.Students).where(
    and(
      eq(schema.Students.first_name, first_name),
      eq(schema.Students.last_name, last_name)
    )
  );
};

export const searchStudentsByID = async (id: number) => {
  return await db.select().from(schema.Students)
    .where(eq(schema.Students.id, id));
}

export const searchStudents = async (query: string) => {
  return await db.select().from(schema.Students).where(
    or(
      ilike(schema.Students.first_name, `%${query}%`),
      ilike(schema.Students.last_name, `%${query}%`),
      ilike(schema.Students.email, `%${query}%`),
      ilike(schema.Students.phone_number, `%${query}%`),
    )
  );
}

export const getStudentByID = async (id: number) => {
  return await db.query.Students.findFirst({
    where: (students, { eq }) => eq(students.id, id),
  });
};

export const getStudentAddressByID = async (id: number) => {
  const student = await getStudentByID(id);
  if (!student) {
    return null;
  }
  const address = await db.query.Addresses.findFirst({
    where: (addresses, { eq }) => eq(addresses.id, student.address_id),
  });
  return address;
};
