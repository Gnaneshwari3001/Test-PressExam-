
"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, database } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { exams } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = ref(database, 'users/' + currentUser.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists() && snapshot.val().role === 'instructor') {
          setUser(currentUser);
        } else {
          router.push('/login'); // Redirect if not an instructor
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
       <div className="container mx-auto px-4 py-12 md:px-6">
        <Skeleton className="h-12 w-1/3 mb-8" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return null; // Or a message indicating unauthorized access
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Instructor Panel</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Exam
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Manage Exams</CardTitle>
          <CardDescription>View, add, update, or delete exams from the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium">{exam.title}</TableCell>
                  <TableCell>{exam.subject}</TableCell>
                  <TableCell>
                    <Badge variant={"default"}>
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell>{exam.questionCount}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

