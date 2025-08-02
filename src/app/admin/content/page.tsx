
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

export default function ContentManagementPage() {
  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Content Management</h1>
            <p className="text-muted-foreground mt-1">Manage subjects, static pages, and announcements.</p>
        </header>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Newspaper /> Site Content</CardTitle>
                <CardDescription>This section is under development. Here you will be able to manage subjects, edit static pages like 'About Us', and post platform-wide announcements.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Coming soon...</p>
            </CardContent>
        </Card>
    </div>
  );
}
