
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

export default function CertificatesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">My Certificates</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Award /> Earned Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will allow you to view and download your earned certificates.</p>
        </CardContent>
      </Card>
    </div>
  );
}
