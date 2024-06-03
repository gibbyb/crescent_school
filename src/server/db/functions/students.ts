import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

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
