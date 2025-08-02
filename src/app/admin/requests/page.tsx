
"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, FileBadge } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type RequestStatus = "Pending" | "Issued" | "Rejected";

interface CertificateRequest {
    id: string;
    studentName: string;
    studentEmail: string;
    reason: string;
    date: string;
    status: RequestStatus;
}

// This would typically come from a database, but we'll use localStorage to persist state.
const getInitialRequests = (): CertificateRequest[] => {
    if (typeof window === "undefined") {
        return [];
    }
    const savedRequests = localStorage.getItem("certificateRequests");
    if (savedRequests) {
        return JSON.parse(savedRequests);
    }
    // Add some initial mock data if nothing is saved
    return [
        { id: "req1", studentName: "John Doe", studentEmail: "john.doe@example.com", reason: "Passport Application", date: "2023-11-10", status: "Issued" },
        { id: "req2", studentName: "Jane Smith", studentEmail: "jane.smith@example.com", reason: "Internship Application", date: "2023-11-12", status: "Pending" },
        { id: "req3", studentName: "Peter Jones", studentEmail: "peter.jones@example.com", reason: "Bank Loan", date: "2023-11-05", status: "Rejected" },
    ];
};


export default function CertificateRequestsPage() {
    const { toast } = useToast();
    const [requests, setRequests] = useState<CertificateRequest[]>([]);

     useEffect(() => {
        setRequests(getInitialRequests());
        // Listen for storage changes to update UI if student makes a new request
        const handleStorageChange = () => {
            setRequests(getInitialRequests());
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleUpdateRequest = (id: string, newStatus: "Issued" | "Rejected") => {
        const updatedRequests = requests.map(req => 
            req.id === id ? { ...req, status: newStatus } : req
        );
        setRequests(updatedRequests);
        localStorage.setItem("certificateRequests", JSON.stringify(updatedRequests));

        toast({
            title: "Request Updated",
            description: `The request has been marked as ${newStatus}.`,
        });
    };

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Certificate Requests</h1>
                <p className="text-muted-foreground mt-1">Manage and process bonafide certificate requests from students.</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileBadge /> All Requests</CardTitle>
                    <CardDescription>Review pending requests and take action.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student Name</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((req) => (
                                <TableRow key={req.id}>
                                    <TableCell className="font-medium">
                                        <div>{req.studentName}</div>
                                        <div className="text-xs text-muted-foreground">{req.studentEmail}</div>
                                    </TableCell>
                                    <TableCell>{req.reason}</TableCell>
                                    <TableCell>{req.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            req.status === 'Pending' ? 'secondary' : 
                                            req.status === 'Issued' ? 'default' : 'destructive'
                                        }>
                                            {req.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        {req.status === 'Pending' && (
                                            <>
                                                <Button size="sm" variant="outline" onClick={() => handleUpdateRequest(req.id, "Issued")}>
                                                    <Check className="mr-2 h-4 w-4"/> Approve
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleUpdateRequest(req.id, "Rejected")}>
                                                    <X className="mr-2 h-4 w-4"/> Reject
                                                </Button>
                                            </>
                                        )}
                                        {req.status !== 'Pending' && (
                                            <span className="text-xs text-muted-foreground">Processed</span>
                                        )}
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
