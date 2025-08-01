
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Payments</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Banknote /> Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will show your payment history and fee receipts.</p>
        </CardContent>
      </Card>
    </div>
  );
}
