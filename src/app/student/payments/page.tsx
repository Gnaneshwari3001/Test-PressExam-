
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Banknote, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const paymentHistory = [
    { id: "txn_1", date: "2023-10-15", description: "Tuition Fee - Fall Semester", amount: "$1200.00", status: "Paid" },
    { id: "txn_2", date: "2023-10-20", description: "Exam Fee - Mid Term", amount: "$50.00", status: "Paid" },
    { id: "txn_3", date: "2023-11-01", description: "Library Fine", amount: "$5.00", status: "Paid" },
    { id: "txn_4", date: "2023-11-05", description: "Lab Materials Fee", amount: "$75.00", status: "Paid" },
];

export default function PaymentsPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Payments</h1>
        <p className="text-muted-foreground mt-1">View your transaction history and download receipts.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Banknote /> Payment History</CardTitle>
          <CardDescription>A record of all your past payments.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="font-medium">{payment.description}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>
                            <Badge variant={payment.status === 'Paid' ? 'default' : 'destructive'}>{payment.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                           <Button variant="outline" size="icon">
                                <Download className="h-4 w-4" />
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
