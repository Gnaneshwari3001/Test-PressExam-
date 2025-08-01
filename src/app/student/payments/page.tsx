
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Banknote, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import ReceiptCard from "@/components/receipt-card";
import { Skeleton } from "@/components/ui/skeleton";

interface Payment {
    id: string;
    date: string;
    description: string;
    amount: string;
    status: string;
}

const initialPaymentHistory: Payment[] = [
    { id: "txn_1", date: "2023-10-15", description: "Tuition Fee - Fall Semester", amount: "$1200.00", status: "Paid" },
    { id: "txn_2", date: "2023-10-20", description: "Exam Fee - Mid Term", amount: "$50.00", status: "Paid" },
    { id: "txn_3", date: "2023-11-01", description: "Library Fine", amount: "$5.00", status: "Paid" },
    { id: "txn_4", date: "2023-11-05", description: "Lab Materials Fee", amount: "$75.00", status: "Paid" },
];

export default function PaymentsPage() {
    const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const [isPrinting, setIsPrinting] = useState(false);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const loadPaymentHistory = () => {
                    const storedHistory = JSON.parse(localStorage.getItem("paymentHistory") || "[]");
                    const combinedHistory = [...initialPaymentHistory];
                    storedHistory.forEach((storedPayment: Payment) => {
                        if (!combinedHistory.some(p => p.id === storedPayment.id)) {
                            combinedHistory.push(storedPayment);
                        }
                    });
                    setPaymentHistory(combinedHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
                };
                loadPaymentHistory();
                window.addEventListener('storage', loadPaymentHistory);
                setLoading(false);

                return () => {
                    window.removeEventListener('storage', loadPaymentHistory);
                };
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleDownloadReceipt = (payment: Payment) => {
        setSelectedPayment(payment);
        setIsPrinting(true);
        setTimeout(() => {
            window.print();
            setSelectedPayment(null);
            setIsPrinting(false);
        }, 100); 
    };
    
    if (isPrinting && selectedPayment && user) {
        return (
             <ReceiptCard 
                payment={selectedPayment} 
                studentName={user.displayName ?? "Student"}
                studentEmail={user.email ?? ""}
              />
        )
    }

    if (loading) {
        return (
            <div>
                 <Skeleton className="h-8 w-1/4 mb-4" />
                 <Skeleton className="h-4 w-1/2 mb-8" />
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </CardContent>
                 </Card>
            </div>
        )
    }

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
                            <Button variant="outline" size="icon" onClick={() => handleDownloadReceipt(payment)}>
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
