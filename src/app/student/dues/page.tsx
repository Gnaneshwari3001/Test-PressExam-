
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileWarning } from "lucide-react";

export default function DuesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Pending Dues</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileWarning /> Outstanding Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will list any pending dues or outstanding payments.</p>
        </CardContent>
      </Card>
    </div>
  );
}
