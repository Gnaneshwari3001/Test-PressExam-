
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck } from "lucide-react";

export default function AttendancePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Attendance</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CalendarCheck /> Attendance Record</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will show your attendance record for various subjects.</p>
        </CardContent>
      </Card>
    </div>
  );
}
