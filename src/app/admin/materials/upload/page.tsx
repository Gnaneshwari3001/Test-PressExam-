
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud } from "lucide-react";
import { exams } from "@/lib/data";
import { useMemo } from "react";

const formSchema = z.object({
  subject: z.string({ required_error: "Please select a subject." }),
  file: z.any().refine(file => file?.length == 1, "File is required."),
});

export default function UploadMaterialsPage() {
  const { toast } = useToast();
  const subjects = useMemo(() => [...Array.from(new Set(exams.map((e) => e.subject)))], []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: undefined,
      file: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, you would handle the file upload to a storage service here.
    toast({
      title: "Upload Successful!",
      description: `The file "${values.file[0].name}" has been uploaded for the subject ${values.subject}.`,
    });
    form.reset();
  }

  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Upload Study Materials</h1>
            <p className="text-muted-foreground mt-1">Share resources with your students by uploading them here.</p>
        </header>

        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><UploadCloud /> New Material</CardTitle>
                <CardDescription>Select a subject and the file you wish to upload.</CardDescription>
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
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a subject" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {subjects.map(subject => (
                                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Material File</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="file" 
                                            onChange={(e) => field.onChange(e.target.files)} 
                                            // To make it a controlled component
                                            // we don't pass the value directly
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit">Upload File</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
