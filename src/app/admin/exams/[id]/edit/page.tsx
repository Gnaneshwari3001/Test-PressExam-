
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getExamById } from "@/lib/data";
import type { Exam } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";


const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  subject: z.string().min(2, "Subject must be at least 2 characters."),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute."),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], { required_error: "Please select a level." }),
  description: z.string().optional(),
});

export default function EditExamPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const examId = params.id as string;
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subject: "",
      duration: 60,
      level: "Beginner",
      description: "",
    },
  });

   useEffect(() => {
    if (examId) {
      const examData = getExamById(examId);
      if (examData) {
        setExam(examData);
        form.reset({
          title: examData.title,
          subject: examData.subject,
          duration: examData.duration,
          level: examData.level,
          description: examData.questions.map(q => q.question).join(', '), // Mock description
        });
      }
      setLoading(false);
    }
  }, [examId, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Updated values:", values);
    // Here you would typically save the updated data to your database
    toast({
      title: "Exam Updated!",
      description: "The exam details have been successfully updated.",
    });
    router.push("/admin/exams");
  }
  
  if (loading) {
    return <Skeleton className="w-full h-96" />
  }

  if (!exam) {
    return <div>Exam not found!</div>
  }

  return (
    <div>
        <header className="flex items-center mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight font-headline ml-4">Edit Exam</h1>
        </header>
        
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Editing '{exam.title}'</CardTitle>
                <CardDescription>Modify the details of the exam below.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Exam Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Introduction to Algebra" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Mathematics" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Duration (minutes)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Difficulty Level</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a level" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="A brief description of the exam content." {...field} rows={4} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => router.push('/admin/exams')}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
