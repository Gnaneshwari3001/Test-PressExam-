
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Send, History, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from "next/navigation";


const formSchema = z.object({
  reason: z.string({ required_error: "Please select a reason for your request." }),
  notes: z.string().max(250, "Notes must be less than 250 characters.").optional(),
});

type RequestStatus = "Pending" | "Under Process" | "Issued" | "Rejected";

interface CertificateRequest {
    id: string;
    studentName: string;
    studentEmail: string;
    reason: string;
    date: string;
    status: RequestStatus;
}


const getInitialRequests = (): CertificateRequest[] => {
    if (typeof window === "undefined") return [];
    const savedRequests = localStorage.getItem("certificateRequests");
    return savedRequests ? JSON.parse(savedRequests) : [
        { id: "req1", studentName: "John Doe", studentEmail: "john.doe@example.com", reason: "Passport Application", date: "2023-11-10", status: "Issued" },
        { id: "req2", studentName: "Jane Smith", studentEmail: "jane.smith@example.com", reason: "Internship Application", date: "2023-11-12", status: "Pending" },
        { id: "req3", studentName: "Peter Jones", studentEmail: "peter.jones@example.com", reason: "Bank Loan", date: "2023-11-05", status: "Rejected" },
        { id: "req4", studentName: "Emily White", studentEmail: "emily.white@example.com", reason: "Scholarship", date: "2023-11-14", status: "Under Process" },
    ];
};

export default function BonafidesPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<CertificateRequest[]>([]);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
            const allRequests = getInitialRequests();
            const userRequests = allRequests.filter(req => req.studentEmail === currentUser.email);
            setRequests(userRequests);
        } else {
            router.push('/login');
        }
    });

    // Listen for storage changes to get real-time updates from admin actions
    const handleStorageChange = () => {
        const allRequests = getInitialRequests();
        if (auth.currentUser) {
            const userRequests = allRequests.filter(req => req.studentEmail === auth.currentUser?.email);
            setRequests(userRequests);
        }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
        unsubscribe();
        window.removeEventListener('storage', handleStorageChange);
    };

  }, [router]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: undefined,
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({ title: "Not Logged In", description: "You must be logged in to make a request.", variant: "destructive"});
        return;
    }

    const allRequests = getInitialRequests();
    const newRequest: CertificateRequest = {
        id: `req${Date.now()}`,
        studentName: user.displayName || "Student",
        studentEmail: user.email || "",
        reason: values.reason,
        date: new Date().toISOString().split('T')[0],
        status: "Pending"
    }

    const updatedRequests = [newRequest, ...allRequests];
    localStorage.setItem("certificateRequests", JSON.stringify(updatedRequests));

    // Manually update the component state for the current user
    setRequests(prev => [newRequest, ...prev]);

    // Also trigger storage event for other tabs/windows if any
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "Request Submitted!",
      description: "Your request for a bonafide certificate has been received. You will be notified once it is processed.",
    });
    form.reset();
  }

  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Bonafide Certificates</h1>
            <p className="text-muted-foreground mt-1">Request official documents for various purposes.</p>
        </header>

        <div className="grid gap-12 md:grid-cols-2">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText /> Request a Certificate</CardTitle>
                <CardDescription>Fill out the form below to submit a new request.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="reason"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Reason for Request</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a reason" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Passport Application">Passport Application</SelectItem>
                                            <SelectItem value="Bank Loan Application">Bank Loan Application</SelectItem>
                                            <SelectItem value="Scholarship Application">Scholarship Application</SelectItem>
                                            <SelectItem value="Internship Application">Internship Application</SelectItem>
                                            <SelectItem value="Other">Other (Please specify in notes)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Additional Notes (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Provide any additional details if necessary..." {...field} rows={4} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                <Send className="mr-2 h-4 w-4"/> Submit Request
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><History /> Request History</CardTitle>
                    <CardDescription>A log of your previous certificate requests.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Reason</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((req, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{req.reason}</TableCell>
                                    <TableCell>{req.date}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={
                                            req.status === 'Pending' ? 'secondary' : 
                                            req.status === 'Issued' ? 'default' : 
                                            req.status === 'Under Process' ? 'outline' : 'destructive'
                                        }>
                                            {req.status}
                                        </Badge>
                                        {req.status === 'Issued' && (
                                            <Button variant="ghost" size="icon" className="ml-2" onClick={() => router.push('/student/certificates')}>
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                             {requests.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-muted-foreground">No requests found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
