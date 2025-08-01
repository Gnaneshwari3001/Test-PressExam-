
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, Edit, Users, BookOpen, ShieldCheck } from "lucide-react";
import { exams } from "@/lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth, database } from "@/lib/firebase";
import { ref, get } from "firebase/database";

type UserRole = 'student' | 'instructor' | 'admin';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if(currentUser) {
            const userRef = ref(database, 'users/' + currentUser.uid);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                setUserRole(snapshot.val().role);
            }
        }
    });
    return () => unsubscribe();
  }, []);

  const pageTitle = userRole === 'admin' ? "Admin Dashboard" : "Instructor Dashboard";

  return (
    <div>
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">{pageTitle}</h1>
             <Link href="/admin/exams/new" passHref>
                <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Exam
                </Button>
            </Link>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Total Exams</CardTitle>
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{exams.length}</p>
                    <p className="text-xs text-muted-foreground">Exams on the platform</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Total Users</CardTitle>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">1250</p>
                    <p className="text-xs text-muted-foreground">Students & Instructors</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Admins</CardTitle>
                        <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">2</p>
                    <p className="text-xs text-muted-foreground">Platform administrators</p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Recent Exams</CardTitle>
                <CardDescription>An overview of the most recently created exams.</CardDescription>
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
                {exams.slice(0, 5).map((exam) => (
                    <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.title}</TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>
                        <Badge variant={"outline"}>
                        Published
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
