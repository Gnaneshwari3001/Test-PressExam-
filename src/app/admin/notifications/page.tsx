
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Bell, Send, History } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

const recentNotifications = [
    { id: 1, title: "Upcoming Maintenance", message: "The platform will be down for scheduled maintenance on Sunday at 2 AM.", date: "2023-10-28" },
    { id: 2, title: "New Feature: Bulk Upload", message: "You can now upload questions in bulk using our new CSV upload feature.", date: "2023-10-25" },
];

export default function NotificationsPage() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Notification Sent!",
            description: "Your announcement has been sent to all students.",
        });
        form.reset();
    }

  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Announcements & Queries</h1>
            <p className="text-muted-foreground mt-1">Send announcements to all students and view incoming queries.</p>
        </header>

        <div className="grid gap-12 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Send />Compose New Announcement</CardTitle>
                    <CardDescription>The message will be broadcast to all registered students.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Final Exam Schedule" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                             <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Your detailed message..." {...field} rows={6} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" className="w-full">Send Announcement</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><History />Activity Log</CardTitle>
                     <CardDescription>A log of previously sent announcements and received queries.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentNotifications.map(notification => (
                        <div key={notification.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold">{notification.title}</h3>
                                <p className="text-xs text-muted-foreground">{notification.date}</p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                    ))}
                     <div className="p-4 border rounded-lg bg-secondary/30">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Query: Issue with Algebra Score</h3>
                            <p className="text-xs text-muted-foreground">From: student@example.com</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">"Hello, I believe there was an error in the grading of my recent Algebra exam. Can someone please review it?"</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
