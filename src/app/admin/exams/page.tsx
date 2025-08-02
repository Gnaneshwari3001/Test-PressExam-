
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal, Trash2, Edit } from "lucide-react";
import { exams as initialExams } from "@/lib/data";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import type { Exam } from "@/lib/types";
import { useRouter } from "next/navigation";


export default function ManageExamsPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [exams, setExams] = useState<Exam[]>(initialExams);

    const handleDelete = (examId: string) => {
        setExams(currentExams => currentExams.filter(exam => exam.id !== examId));
        toast({
            title: "Exam Deleted",
            description: "The exam has been successfully deleted.",
            variant: "destructive"
        })
    }

  return (
    <div>
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Manage Exams</h1>
             <Link href="/admin/exams/new" passHref>
                <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Exam
                </Button>
            </Link>
        </header>

        <Card>
            <CardHeader>
                <CardTitle>All Exams</CardTitle>
                <CardDescription>A list of all exams created on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Exam Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Level</TableHead>
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
                            <Badge variant={exam.level === 'Beginner' ? 'secondary' : exam.level === 'Intermediate' ? 'default' : 'destructive'}>{exam.level}</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant={"outline"}>Published</Badge>
                        </TableCell>
                        <TableCell>{exam.questionCount}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => router.push(`/admin/exams/${exam.id}/edit`)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Exam
                                    </DropdownMenuItem>
                                     <DropdownMenuItem onClick={() => router.push(`/admin/exams/${exam.id}/questions`)}>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Manage Questions
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(exam.id)}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Exam
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
