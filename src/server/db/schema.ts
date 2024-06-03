// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  pgEnum,
  boolean,
  integer,
  decimal,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `crescent_school_${name}`);

export const sex_enum = pgEnum("sex_enum", ['Not Assigned','Male', 'Female', 'Other']);
export const race_enum = pgEnum("race_enum", ['Not Assigned','White','African American','Hispanic','Asian','Native American','Pacific Islander']);
export const program_enum = pgEnum("program_enum", ['Not Assigned','All Game','Two Game','One Game','Short Bar','Bar Management']);
export const status_enum = pgEnum("status_enum", ['Not Assigned','Student','Graduate','Dropped','DC','CXL']);
export const collection_status_enum = pgEnum("collection_status_enum", ['Not Assigned','Sent','Paid','Unpaid']);
export const comment_type_enum = pgEnum("comment_type_enum", ['Not Assigned','Admission','Master','Placement']);
export const class_enum = pgEnum("class_enum", ['Not Assigned', 'Day', 'Night']);

export const Students = createTable(
  "students",
  {
    id: serial("id").primaryKey().notNull(),
    school_id: serial("school_id").notNull().references(() => Schools.id),
    first_name: varchar("first_name", {length: 256}).notNull(),
    last_name: varchar("last_name", {length: 256}).notNull(),
    program: program_enum("program").default('Not Assigned').notNull(),
    class: class_enum("class").default('Not Assigned').notNull(),
    SSN: varchar("SSN", {length: 256}).notNull().unique(),
    phone_number: varchar("phone_number", {length: 256}),
    email: varchar("email", {length: 256}).notNull(),
    dob: timestamp("dob", { withTimezone: true }),
    sex: sex_enum("sex").default('Not Assigned').notNull(), 
    race: race_enum("race").default('Not Assigned').notNull(),
    status: status_enum("status").default('Not Assigned').notNull(),
    address_id: serial("address_id").notNull().references(() => Adresses.id),
    start_date: timestamp("start_date", { withTimezone: true }),
    grad_date: timestamp("grad_date", { withTimezone: true }),
    placement_date: timestamp("placement_date", { withTimezone: true }),
    hs_diploma: boolean("hs_diploma").default(false).notNull(),
    prior_education: boolean("prior_education").default(false).notNull(),
    citizenship: boolean("citizenship").default(false).notNull(),
    WIN: boolean("WIN").default(false).notNull(),
    MTA: boolean("MTA").default(false).notNull(),
    veterans_affairs: boolean("veterans_affairs").default(false).notNull(),
    in_school: boolean("in_school").default(false).notNull(),
  },
  //(example) => ({
    //first_name_index: index("first_name_idx").on(example.first_name),
  //}),
);

export const Schools = createTable(
  "schools",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", {length: 256}).notNull(),
    address_id: serial("address_id").notNull().references(() => Adresses.id),
    phone_number: varchar("phone_number", {length: 256}),
    fax_number: varchar("fax_number", {length: 256}),
    email: varchar("email", {length: 256}),
  },
);

export const Accounting = createTable(
  "accounting",
  {
    id: serial("id").primaryKey().notNull(),
    student_id: serial("student_id").notNull().references(() => Students.id),
    living_expenses: decimal("living_expenses").notNull(),
    next_payment_due: timestamp("next_payment_due", { withTimezone: true }).notNull(),
    date_billed: timestamp("date_billed", { withTimezone: true }).notNull(),
    collection_sent: timestamp("collection_sent", { withTimezone: true }).notNull(),
    collection_status: collection_status_enum("collection_status").default('Not Assigned').notNull(),
  },
);

export const Comments = createTable(
  "comments",
  {
    id: serial("id").primaryKey().notNull(),
    student_id: serial("student_id").notNull().references(() => Students.id),
    instructor_id: serial("instructor_id").notNull().references(() => Instructors.id),
    comment: varchar("comment", {length: 256}).notNull(),
    date: timestamp("date", { withTimezone: true }).notNull(),
    comment_type: comment_type_enum("comment_type").default('Not Assigned').notNull(),
  },
);

export const Disbursements = createTable(
  "disbursements",
  {
    id: serial("id").primaryKey().notNull(),
    student_id: serial("student_id").notNull().references(() => Students.id),
    fund_type: varchar("fund_type", {length: 256}).notNull(),
    scheduled_disbursement_date: timestamp("scheduled_disbursement_date", { withTimezone: true }),
    actual_disbursement_date: timestamp("actual_disbursement_date", { withTimezone: true }),
    anticipated_amount: decimal("anticipated_amount"),
    amount: decimal("amount").notNull(),
    return_date: timestamp("return_date", { withTimezone: true }),
  },
);

export const Receipts = createTable(
  "receipts",
  {
    id: serial("id").primaryKey().notNull(),
    student_id: serial("student_id").notNull().references(() => Students.id),
    payment_number: integer("payment_number").notNull(),
    payment_date: timestamp("payment_date", { withTimezone: true }).notNull(),
    payment_amount: decimal("payment_amount").notNull(),
    payment_type: varchar("payment_type", {length: 256}).notNull(),
    check_number: varchar("check_number", {length: 256}),
    receipt_taken_by: serial("receipt_taken_by").notNull().references(() => Instructors.id),
    deposit_date: timestamp("deposit_date", { withTimezone: true }),
  },
);

export const Holidays = createTable(
  "holidays",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", {length: 256}).notNull(),
    school_id: serial("school_id").notNull().references(() => Schools.id),
    date: timestamp("date", { withTimezone: true }).notNull(),
  },
);

export const Instructors = createTable(
  "instructors",
  {
    id: serial("id").primaryKey().notNull(),
    school_id: serial("school_id").notNull().references(() => Schools.id),
    first_name: varchar("first_name", {length: 256}).notNull(),
    last_name: varchar("last_name", {length: 256}).notNull(),
    phone_number: varchar("phone_number", {length: 256}),
    email: varchar("email", {length: 256}),
    address_id: serial("address_id").references(() => Adresses.id),
  },
);

export const Classes = createTable(
  "classes",
  {
    id: serial("id").primaryKey().notNull(),
    school_id: serial("school_id").notNull().references(() => Schools.id),
    name: varchar("name", {length: 256}).notNull(),
    class_time: timestamp("class_time", { withTimezone: true }).notNull(),
    credits: integer("credits").notNull(),
  },
);

export const Tests = createTable(
  "tests",
  {
    id: serial("id").primaryKey().notNull(),
    class_id: serial("class_id").notNull().references(() => Classes.id),
    student_id: serial("student_id").notNull().references(() => Students.id),
    score: decimal("score").notNull(),
  },
);

export const Attendance = createTable(
  "attendance",
  {
    id: serial("id").primaryKey().notNull(),
    student_id: serial("student_id").notNull().references(() => Students.id),
    class_id: serial("class_id").notNull().references(() => Classes.id),
    date: timestamp("date", { withTimezone: true }).notNull(),
    hours: decimal("hours"),
    mod: integer("mod"),
    absent: boolean("absent").default(false).notNull(),
  },
);

export const Participation = createTable(
  "participation",
  {
    id: serial("id").primaryKey().notNull(),
    student_id: serial("student_id").notNull().references(() => Students.id),
    class_id: serial("class_id").notNull().references(() => Classes.id),
    date: timestamp("date", { withTimezone: true }).notNull(),
    participation: decimal("participation").notNull(),
  },
);

export const Games = createTable(
  "games",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", {length: 256}).notNull(),
    student_id: serial("student_id").notNull().references(() => Students.id),
    casino_attitude: decimal("casino_attitude").notNull(),
    audition: decimal("audition").notNull(),
  },
);

export const Courses = createTable(
  "courses",
  {
    id: serial("id").primaryKey().notNull(),
    student_id: serial("student_id").notNull().references(() => Students.id),
    name: varchar("name", {length: 256}).notNull(),
    grade: decimal("grade").notNull(),
  },
);

export const Completed_Sections = createTable(
  "completed_sections",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", {length: 256}).notNull(),
    student_id: serial("student_id").notNull().references(() => Students.id),
  },
);

export const Adresses = createTable(
  "addresses",
  {
    id: serial("id").primaryKey().notNull(),
    address1: varchar("address1", {length: 256}).notNull(),
    address2: varchar("address2", {length: 256}),
    city: varchar("city", {length: 256}).notNull(),
    state: varchar("state", {length: 256}).notNull(),
    zip: varchar("zip", {length: 256}).notNull(),
  },
);

export const Admissions = createTable(
  "admissions",
  {
    id: serial("id").primaryKey().notNull(),
    student_id: serial("student_id").notNull().references(() => Students.id),
    school_id: serial("school_id").notNull().references(() => Schools.id),
    first_contact_date: timestamp("first_contact_date", { withTimezone: true }),
    last_contact_date: timestamp("last_contact_date", { withTimezone: true }),
    interview_date: timestamp("interview_date", { withTimezone: true }),
    call_back_date: timestamp("call_back_date", { withTimezone: true }),
    scheduled_appointment_date: timestamp("scheduled_appointment_date", { withTimezone: true }),
    enroll_date: timestamp("enroll_date", { withTimezone: true }),
    reference: varchar("reference", {length: 256}),
    interviewed_by: serial("interviewed_by").notNull().references(() => Instructors.id),
    call_taken_by: serial("call_taken_by").notNull().references(() => Instructors.id),
    enrolled_by: serial("enrolled_by").notNull().references(() => Instructors.id),
  },
);
