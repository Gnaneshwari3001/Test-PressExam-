
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function BonafidesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Bonafide Certificates</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText /> Request Certificate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will allow you to request bonafide certificates.</p>
        </CardContent>
      </Card>
    </div>
  );
}
