
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
import { FileText, Send, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

const formSchema = z.object({
  reason: z.string({ required_error: "Please select a reason for your request." }),
  notes: z.string().max(250, "Notes must be less than 250 characters.").optional(),
});

type Request = {
    reason: string;
    date: string;
    status: "Pending" | "Issued" | "Rejected";
}

const initialRequests: Request[] = [
    { reason: "Passport Application", date: "2023-10-15", status: "Issued"},
    { reason: "Internship Application", date: "2023-09-02", status: "Issued"},
];

export default function BonafidesPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: undefined,
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const newRequest: Request = {
        reason: values.reason,
        date: new Date().toISOString().split('T')[0],
        status: "Pending"
    }

    setRequests([newRequest, ...requests]);
    
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
                                        <Badge variant={req.status === 'Pending' ? 'secondary' : req.status === 'Issued' ? 'default' : 'destructive'}>
                                            {req.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

