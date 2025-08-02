
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileClock } from "lucide-react";

export default function AuditLogsPage() {
  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Audit Logs</h1>
            <p className="text-muted-foreground mt-1">Track important activities across the platform.</p>
        </header>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileClock /> Activity Tracker</CardTitle>
                <CardDescription>This section is under development. Here you will be able to view all admin activities, track user logins, and export logs for auditing purposes.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Coming soon...</p>
            </CardContent>
        </Card>
    </div>
  );
}
