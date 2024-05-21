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

export const Students = createTable(
  "students",
  {
    id: serial("id").primaryKey().notNull(),
    first_name: varchar("first_name", {length: 256}).notNull(),
    last_name: varchar("last_name", {length: 256}).notNull(),
    program: program_enum("program").default('Not Assigned').notNull(),
    SSN: varchar("SSN", {length: 256}).notNull().unique(),
    phone_number: varchar("phone_number", {length: 256}),
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
);

export const Adresses = createTable(
  "addresses",
  {
    id: serial("id").primaryKey(),
    address1: varchar("address1", {length: 256}).notNull(),
    address2: varchar("address2", {length: 256}),
    city: varchar("city", {length: 256}).notNull(),
    state: varchar("state", {length: 256}).notNull(),
    zip: varchar("zip", {length: 256}).notNull(),
  },
);
