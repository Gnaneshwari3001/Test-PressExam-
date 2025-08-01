
import { GraduationCap, CheckCircle } from "lucide-react";

interface Payment {
    id: string;
    date: string;
    description: string;
    amount: string;
    status: string;
}

interface ReceiptCardProps {
    payment: Payment;
    studentName: string;
    studentEmail: string;
}

export default function ReceiptCard({ payment, studentName, studentEmail }: ReceiptCardProps) {
    const receiptDate = new Date(payment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="flex items-center justify-center min-h-screen bg-white text-gray-800">
            <div className="w-full max-w-2xl p-8 bg-white border-2 border-gray-300 rounded-lg shadow-lg font-sans">
                <header className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-10 w-10 text-primary" />
                        <h1 className="text-2xl font-bold">TestPress</h1>
                    </div>
                    <div className="text-right">
                        <h2 className="text-3xl font-bold uppercase tracking-wider">Receipt</h2>
                        <p className="text-sm text-gray-500">Transaction ID: {payment.id}</p>
                    </div>
                </header>

                <main className="grid grid-cols-2 gap-8 my-8">
                    <div>
                        <p className="font-bold text-gray-600">Billed To:</p>
                        <p>{studentName}</p>
                        <p>{studentEmail}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-gray-600">Payment Date:</p>
                        <p>{receiptDate}</p>
                        <p className="font-bold text-gray-600 mt-2">Status:</p>
                        <div className="flex items-center justify-end gap-2 mt-1">
                            <CheckCircle className="h-5 w-5 text-green-500"/>
                            <span className="font-semibold text-green-600">{payment.status}</span>
                        </div>
                    </div>
                </main>

                <section>
                    <h3 className="text-lg font-semibold border-b pb-2 mb-2">Payment Details</h3>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2">Description</th>
                                <th className="p-2 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-2">{payment.description}</td>
                                <td className="p-2 text-right font-medium">{payment.amount}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                
                <footer className="mt-8 pt-4 border-t text-center text-gray-500 text-sm">
                    <p>Thank you for your payment!</p>
                    <p>TestPress | 123 Education Lane, Knowledge City, 98765 | support@testpress.com</p>
                </footer>
            </div>
        </div>
    );
}
