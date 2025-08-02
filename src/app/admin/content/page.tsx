
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, BookCopy, Send, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const recentAnnouncements = [
    { id: 1, title: "Finals Week Schedule", message: "The final exam schedule for all subjects has now been posted. Please check your dashboard.", date: "2023-12-01" },
    { id: 2, title: "Platform Maintenance", message: "There will be scheduled maintenance this Saturday from 2 AM to 4 AM.", date: "2023-11-28" },
];

export default function ContentManagementPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleSendAnnouncement = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Announcement Sent!",
            description: "The announcement has been broadcast to all users.",
        });
        (e.target as HTMLFormElement).reset();
    }

  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Content Management</h1>
            <p className="text-muted-foreground mt-1">Manage subjects, static pages, and announcements.</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/admin/subjects')}>
                <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2"><BookCopy /> Manage Subjects</CardTitle>
                      <Button variant="outline">View All</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Add, edit, or remove subjects from the platform. Update curriculum details and associated question banks.</p>
                </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Newspaper /> Static Pages</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Edit the content of pages like 'About Us', 'Contact', 'Privacy Policy', and 'Terms of Service'. (This feature is in development).</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mt-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Send/> Send New Announcement</CardTitle>
                    <CardDescription>Broadcast a message to all platform users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSendAnnouncement}>
                        <Input name="title" placeholder="Announcement Title" required />
                        <Textarea name="message" placeholder="Type your message here..." rows={5} required />
                        <Button type="submit" className="w-full">Send Announcement</Button>
                    </form>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><History /> Recent Announcements</CardTitle>
                    <CardDescription>A log of the most recent announcements sent.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {recentAnnouncements.map(notification => (
                        <div key={notification.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold">{notification.title}</h3>
                                <p className="text-xs text-muted-foreground">{notification.date}</p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
