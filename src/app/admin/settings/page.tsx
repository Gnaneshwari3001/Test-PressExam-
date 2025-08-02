
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function PlatformSettingsPage() {
  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Platform Settings</h1>
            <p className="text-muted-foreground mt-1">Configure global settings for the TestPress platform.</p>
        </header>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Settings /> Global Configuration</CardTitle>
                <CardDescription>This section is under development. Here you will be able to configure exam policies, change the theme and logo, manage API integrations, and set up notification preferences.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Coming soon...</p>
            </CardContent>
        </Card>
    </div>
  );
}
