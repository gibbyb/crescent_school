"use client"
import * as React from "react"
import { Button } from "~/components/ui/button"
import { FaSearch } from "react-icons/fa"
import { Input } from "~/components/ui/input"
import { useRouter } from "next/navigation"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  //DrawerDescription,
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
  school?: string;
  status?: string;
  // Add other fields as necessary
}

type StudentResponse = Student[];

export const Search_Students_Drawer: React.FC = () => {
  const [students, setStudents] = React.useState<StudentResponse>([]);
  const [student_query, setStudentQuery] = React.useState<string>("");
  const router = useRouter();

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
        <Button className="bg-gradient-to-br from-slate-900 to-slate-900 text-white">
          <FaSearch />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-10">
          <DrawerHeader>
            <DrawerTitle className="mx-auto">Search for Student</DrawerTitle>
              <div className="p-2" />
              <form onSubmit={searchStudents}>
                <Input
                  type="text"
                  value={student_query}
                  onChange={(e) => setStudentQuery(e.target.value)}
                />
                <div className="p-4" />
                <Button className="w-full" type="submit">Submit</Button>
              </form>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Cancel</Button>
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
                    <TableRow key={student.id} >
                        <TableCell className="font-medium">
                          <button onClick={() => router.push(`/students/${student.id}`)}>
                            {student.first_name} {student.last_name}
                          </button>
                        </TableCell>
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
