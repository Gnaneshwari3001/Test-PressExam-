
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
import { HelpCircle, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export default function QueryPage() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subject: "",
            message: "",
        },
    });

    useEffect(() => {
        const subjectParam = searchParams.get("subject");
        if (subjectParam) {
            form.setValue("subject", subjectParam);
        }
    }, [searchParams, form]);


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Query Submitted!",
            description: "Your query has been sent. We will get back to you shortly.",
        });
        form.reset();
    }

  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Raise a Query</h1>
            <p className="text-muted-foreground mt-1">Have a question or concern? Let us know.</p>
        </header>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><HelpCircle /> Submit Your Query</CardTitle>
                <CardDescription>Fill out the form below and our support team will get back to you.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Issue with exam results" {...field} />
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
                                <FormLabel>Detailed Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Please describe your issue in detail..." {...field} rows={6} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full"><Send className="mr-2 h-4 w-4"/>Submit Query</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
