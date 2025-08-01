
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const uploadLog = [
    { id: 1, subject: "Data Structures", fileName: "data-structures-notes.pdf", uploader: "Dr. Alan Grant", role: "instructor", date: "2023-10-20 10:30 AM" },
    { id: 2, subject: "Algorithms", fileName: "algorithm-cheatsheet.pdf", uploader: "Dr. Ellie Sattler", role: "instructor", date: "2023-10-22 02:15 PM" },
    { id: 3, subject: "Operating Systems", fileName: "os-concepts.pdf", uploader: "Dr. Ian Malcolm", role: "instructor", date: "2023-10-25 09:00 AM" },
    { id: 4, subject: "Data Structures", fileName: "advanced-trees.pdf", uploader: "Dr. Alan Grant", role: "instructor", date: "2023-10-28 11:45 AM" },
    { id: 5, subject: "Computer Networks", fileName: "osi-model-guide.pdf", uploader: "Dr. Sarah Harding", role: "instructor", date: "2023-11-01 04:50 PM" },
    { id: 6, subject: "Software Engineering", fileName: "sdlc-models.pdf", uploader: "Dr. Henry Wu", role: "instructor", date: "2023-11-02 01:20 PM" },
];

export default function MaterialsLogPage() {

  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Materials Upload Log</h1>
            <p className="text-muted-foreground mt-1">A log of all materials uploaded by instructors.</p>
        </header>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><History /> Upload History</CardTitle>
                <CardDescription>Monitor all file upload activities across the platform.</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Timestamp</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {uploadLog.map((log) => (
                    <TableRow key={log.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                            <FileText className="h-5 w-5 text-muted-foreground"/>
                            {log.fileName}
                        </TableCell>
                        <TableCell>{log.subject}</TableCell>
                        <TableCell>{log.uploader}</TableCell>
                        <TableCell>
                            <Badge variant="secondary" className="capitalize">{log.role}</Badge>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">{log.date}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    </div>
  );
}
