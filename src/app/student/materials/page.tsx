
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban } from "lucide-react";

export default function MaterialsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Study Materials</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FolderKanban /> Course Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will provide access to study materials and course resources.</p>
        </CardContent>
      </Card>
    </div>
  );
}
