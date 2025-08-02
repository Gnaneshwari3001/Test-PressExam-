
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Palette, Bell, ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PlatformSettingsPage() {
  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Platform Settings</h1>
            <p className="text-muted-foreground mt-1">Configure global settings for the TestPress platform.</p>
        </header>

        <div className="grid gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Palette/> Theme & Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="dark-mode">Enable Dark Mode for All Users</Label>
                        <Switch id="dark-mode" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="logo-upload">Upload Logo</Label>
                        <Input id="logo-upload" type="file" />
                        <p className="text-xs text-muted-foreground">Recommended size: 200x50px. PNG format.</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="platform-name">Platform Name</Label>
                        <Input id="platform-name" defaultValue="TestPress" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ShieldCheck/> Exam Policies</CardTitle>
                    <CardDescription>Set global rules for all examinations conducted on the platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="flex items-center justify-between">
                        <Label htmlFor="proctoring">Enable AI Proctoring by Default</Label>
                        <Switch id="proctoring" checked />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="retakes">Maximum Retake Attempts</Label>
                         <Select defaultValue="2">
                            <SelectTrigger className="w-full md:w-1/2">
                                <SelectValue placeholder="Select max retakes" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">No retakes allowed</SelectItem>
                                <SelectItem value="1">1 Retake</SelectItem>
                                <SelectItem value="2">2 Retakes</SelectItem>
                                <SelectItem value="3">3 Retakes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="copy-paste">Disable Copy/Paste During Exams</Label>
                        <Switch id="copy-paste" checked />
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell/> Notification Settings</CardTitle>
                    <CardDescription>Configure email and platform notification settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="flex items-center justify-between">
                        <Label htmlFor="email-on-signup">Send Welcome Email on User Signup</Label>
                        <Switch id="email-on-signup" checked />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="email-on-result">Email Students Their Results Automatically</Label>
                        <Switch id="email-on-result" />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button>Save All Changes</Button>
            </div>
        </div>
    </div>
  );
}
