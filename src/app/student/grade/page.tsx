
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function GradePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">My Grade</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><GraduationCap /> Overall Grade</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will display your overall grade and academic standing.</p>
        </CardContent>
      </Card>
    </div>
  );
}
