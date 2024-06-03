# Crescent School of Gaming Stack Rewrite

This is a rewrite of the Crescent School of Gaming's current "stack," which is just a Microsoft Access database.
The rewrite will use Next.js, PostgreSQL, Drizzle, Auth.js, Typescript, & TailwindCSS.
This project was also built with Create T3 App.

## To Do:

### Big Picture

- [x] Initialize project, install & configure dependencies
- [x] Set up PostgreSQL database
- [x] Set up Drizzle
- [x] Complete rough draft of database schema
- [x] Set up Auth.js with Microsoft Entra & GitHub
- [x] Make a decent nav bar for mobile & desktop
- [x] Set up shadcn/ui
- [x] Set up first database function using Drizzle
- [x] Add environment variables to the env.js file
- [ ] Finish Admissions Form. Ensure that you can add a student to the database with form.
- [X] Add some kind of permissions based on Auth. Prevent users from accessing pages without being signed in.
- [ ] Create a search page where you can do Advanced searches on students.
- [ ] Clean up & complete database schema
- [ ] Create your first API that will interact with the database

### Small Picture

#### Admissions Form

- [ ] Add fields in the box below the form.
- [ ] Add the ability to search for a student & select them. If selected, populate the form with their information.
    - [ ] This search could come from a slidover/drawer thing, and be dynamic depending on what page the user is on. 
- [ ] Let the user add comments to the student's profile
    - [ ] Display all student comments in table.
- [ ] Add the ability to add a student to the database
- [ ] Look through form and consider reorganizing the form based on what fields are used the most.
- [ ] How will a user add comments for a student that has not yet been admitted/added to the database?
