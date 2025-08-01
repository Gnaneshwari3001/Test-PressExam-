
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

export default function SubjectsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">My Subjects</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Book /> Enrolled Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will display the subjects you are enrolled in.</p>
        </CardContent>
      </Card>
    </div>
  );
}
