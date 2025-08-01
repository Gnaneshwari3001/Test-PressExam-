
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileWarning, CircleDollarSign, HelpCircle, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Due {
    id: string;
    dueDate: string;
    description: string;
    amount: number;
    status: string;
}

const initialDues: Due[] = [
    { id: "due_1", dueDate: "2023-12-15", description: "Spring Semester - Tuition Fee", amount: 1200.00, status: "Upcoming" },
    { id: "due_2", dueDate: "2023-11-30", description: "Final Exam Fee", amount: 50.00, status: "Due" },
    { id: "due_3", dueDate: "2023-12-05", description: "Library Book Fine - 'Intro to OS'", amount: 5.50, status: "Due" },
    { id: "due_4", dueDate: "2023-12-10", description: "Lab Materials Fee - Chemistry", amount: 75.00, status: "Upcoming" },
    { id: "due_5", dueDate: "2023-11-25", description: "Hostel Fee - November", amount: 250.00, status: "Overdue" },
    { id: "due_6", dueDate: "2024-01-15", description: "Spring Sports Club Membership", amount: 45.00, status: "Upcoming" },
    { id: "due_7", dueDate: "2023-12-20", description: "Graduation Gown Rental", amount: 30.00, status: "Upcoming" },
    { id: "due_8", dueDate: "2023-11-28", description: "Parking Permit - Fall", amount: 100.00, status: "Due" },
    { id: "due_9", dueDate: "2024-01-05", description: "Health Center Fee", amount: 60.00, status: "Upcoming" },
    { id: "due_10", dueDate: "2023-10-31", description: "Halloween Party Contribution", amount: 10.00, status: "Overdue" },
];

export default function DuesPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDue, setSelectedDue] = useState<Due | null>(null);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [pendingDues, setPendingDues] = useState<Due[]>(initialDues);

    const handlePayClick = (due: Due) => {
        setSelectedDue(due);
        setPaymentAmount(due.amount.toFixed(2));
        setIsModalOpen(true);
    }

    const handleConfirmPayment = () => {
        if (!selectedDue || !paymentAmount) return;

        console.log(`Processing payment of $${paymentAmount} for ${selectedDue.description}`);

        // Update payment history in localStorage
        const paymentHistory = JSON.parse(localStorage.getItem("paymentHistory") || "[]");
        const newPayment = {
            id: `txn_${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            description: selectedDue.description,
            amount: `$${parseFloat(paymentAmount).toFixed(2)}`,
            status: "Paid"
        };
        const updatedHistory = [...paymentHistory, newPayment];
        localStorage.setItem("paymentHistory", JSON.stringify(updatedHistory));


        // Remove due from the list
        setPendingDues(pendingDues.filter(d => d.id !== selectedDue.id));

        toast({
            title: "Payment Successful!",
            description: `Your payment of $${paymentAmount} has been processed.`,
        });
        setIsModalOpen(false);
        setSelectedDue(null);
        setPaymentAmount("");
    }

    const handleRequestExtension = (dueDescription: string) => {
        router.push(`/student/query?subject=Extension Request: ${dueDescription}`);
    }

    const totalDue = pendingDues.reduce((sum, due) => sum + due.amount, 0);

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
                        <TableCell>${due.amount.toFixed(2)}</TableCell>
                        <TableCell>
                            <Badge variant={due.status === 'Due' ? 'destructive' : 'secondary'}>{due.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                           <Button size="sm" onClick={() => handlePayClick(due)}>
                               <CircleDollarSign className="mr-2 h-4 w-4"/> Pay Now
                           </Button>
                           <Button size="sm" variant="outline" onClick={() => handleRequestExtension(due.description)}>
                                <HelpCircle className="mr-2 h-4 w-4"/> Request Extension
                           </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </CardContent>
         <CardFooter className="flex justify-end font-bold text-lg">
            Total Due: ${totalDue.toFixed(2)}
        </CardFooter>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><QrCode/> Scan to Pay</DialogTitle>
            <DialogDescription>
              Scan the QR code with your payment app to complete the transaction for '{selectedDue?.description}'.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
              <Image 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=testpress@payment&pn=TestPress&am=${paymentAmount}&tn=${encodeURIComponent(selectedDue?.description || 'Fee Payment')}`}
                alt="QR Code for payment" 
                width={250} 
                height={250}
                data-ai-hint="qr code"
              />
              <div className="w-full">
                <Label htmlFor="amount" className="text-right mb-2">
                  Amount to Pay
                </Label>
                <Input 
                  id="amount" 
                  value={paymentAmount} 
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="col-span-3" 
                />
              </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleConfirmPayment}>Confirm Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
