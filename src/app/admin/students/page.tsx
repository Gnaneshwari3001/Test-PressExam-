
"use client"

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { auth, database } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Student {
    uid: string;
    name: string;
    email: string;
    photoURL?: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const fetchStudents = async () => {
      const usersRef = ref(database, 'users');
      const studentQuery = query(usersRef, orderByChild('role'), equalTo('student'));
      const snapshot = await get(studentQuery);
      
      if (snapshot.exists()) {
        const studentsData: Student[] = [];
        snapshot.forEach((childSnapshot) => {
          studentsData.push({ uid: childSnapshot.key, ...childSnapshot.val() });
        });
        setStudents(studentsData);
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
      return (
           <div className="space-y-4">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-96 w-full" />
           </div>
      )
  }

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Student Management</h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>View and manage all registered students.</CardDescription>
            <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                type="text"
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 max-w-sm"
                />
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.uid}>
                  <TableCell className="font-medium flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={student.photoURL} alt={student.name} />
                        <AvatarFallback>{student.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {student.name}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell className="text-right">
                    {/* Action buttons can go here */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           {filteredStudents.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    No students found.
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
