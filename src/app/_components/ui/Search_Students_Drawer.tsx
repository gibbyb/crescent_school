"use client"
import * as React from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  school: string;
  status: string;
  // Add other fields as necessary
}

type StudentResponse = Student[];

export const Search_Students_Drawer: React.FC = () => {
  const [students, setStudents] = React.useState<StudentResponse>([]);
  const [student_query, setStudentQuery] = React.useState<string>("");

  const searchStudents = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/db/students/search?query=${student_query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data: StudentResponse = await response.json() as StudentResponse;
        setStudents(data);
      } else {
        console.log("No students found");
      }
    } catch (error) {
      console.error("Error searching students:", error);
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Search</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-10">
          <DrawerHeader>
            <DrawerTitle>Search for Student</DrawerTitle>
              <form onSubmit={searchStudents}>
                <Input
                  type="text"
                  value={student_query}
                  onChange={(e) => setStudentQuery(e.target.value)}
                />
                <Button type="submit">Submit</Button>
              </form>
            <DrawerDescription>Blah Blah</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Table>
              <TableCaption>Students</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.first_name} {student.last_name}</TableCell>
                      <TableCell>{student.school}</TableCell>
                      <TableCell>{student.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No students found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default Search_Students_Drawer;
