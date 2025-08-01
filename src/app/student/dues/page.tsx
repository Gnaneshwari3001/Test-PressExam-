
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileWarning, CircleDollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const pendingDues = [
    { id: "due_1", dueDate: "2023-12-15", description: "Spring Semester - Tuition Fee", amount: "$1200.00", status: "Upcoming" },
    { id: "due_2", dueDate: "2023-11-30", description: "Final Exam Fee", amount: "$50.00", status: "Due" },
];

export default function DuesPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Pending Dues</h1>
        <p className="text-muted-foreground mt-1">Manage and clear your outstanding payments.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileWarning /> Outstanding Payments</CardTitle>
          <CardDescription>A list of all pending fees and dues.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {pendingDues.map((due) => (
                    <TableRow key={due.id}>
                        <TableCell>{due.dueDate}</TableCell>
                        <TableCell className="font-medium">{due.description}</TableCell>
                        <TableCell>{due.amount}</TableCell>
                        <TableCell>
                            <Badge variant={due.status === 'Due' ? 'destructive' : 'secondary'}>{due.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                           <Button><CircleDollarSign className="mr-2 h-4 w-4"/> Pay Now</Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </CardContent>
         <CardFooter className="flex justify-end font-bold text-lg">
            Total Due: $1250.00
        </CardFooter>
      </Card>
    </div>
  );
}
