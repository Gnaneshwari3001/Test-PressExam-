
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileClock, User, Edit, LogIn, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const auditLog = [
    { id: 1, user: { name: "Adam John", avatar: "/avatars/01.png" }, action: "User Login", details: "Logged in via password", ip: "192.168.1.1", timestamp: "2023-12-01 10:00 AM" },
    { id: 2, user: { name: "Jane Doe", avatar: "/avatars/02.png" }, action: "Exam Created", details: "Created 'Introduction to Algebra'", ip: "203.0.113.25", timestamp: "2023-12-01 09:30 AM" },
    { id: 3, user: { name: "Adam John", avatar: "/avatars/01.png" }, action: "User Edited", details: "Changed role for student@example.com", ip: "192.168.1.1", timestamp: "2023-11-30 05:15 PM" },
    { id: 4, user: { name: "Peter Jones", avatar: "/avatars/03.png" }, action: "Exam Submitted", details: "Submitted 'Basics of Physics'", ip: "198.51.100.10", timestamp: "2023-11-30 02:45 PM" },
    { id: 5, user: { name: "Jane Doe", avatar: "/avatars/02.png" }, action: "Content Uploaded", details: "Uploaded 'algebra-notes.pdf'", ip: "203.0.113.25", timestamp: "2023-11-29 11:00 AM" },
];

const getActionIcon = (action: string) => {
    switch (action) {
        case 'User Login': return <LogIn className="h-4 w-4 text-blue-500" />;
        case 'Exam Created': return <PlusCircle className="h-4 w-4 text-green-500" />;
        case 'User Edited': return <Edit className="h-4 w-4 text-orange-500" />;
        default: return <FileClock className="h-4 w-4 text-muted-foreground" />;
    }
}

export default function AuditLogsPage() {
  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Audit Logs</h1>
            <p className="text-muted-foreground mt-1">Track important activities across the platform.</p>
        </header>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileClock /> Activity Tracker</CardTitle>
                <CardDescription>View all admin activities, user actions, and export logs for auditing purposes.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>IP Address</TableHead>
                            <TableHead className="text-right">Timestamp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {auditLog.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="font-medium flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={log.user.avatar} alt={log.user.name} />
                                        <AvatarFallback>{log.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {log.user.name}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {getActionIcon(log.action)}
                                        {log.action}
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{log.details}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{log.ip}</Badge>
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground">{log.timestamp}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
