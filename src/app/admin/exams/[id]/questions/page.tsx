
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getExamById } from "@/lib/data";
import type { Exam, Question } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters."),
  options: z.array(
      z.object({ value: z.string().min(1, "Option cannot be empty.") })
    ).min(2, "Must have at least 2 options."),
  correctAnswer: z.string({ required_error: "Please select the correct answer."}),
});

export default function ManageQuestionsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const examId = params.id as string;
  
  const [exam, setExam] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
      correctAnswer: undefined,
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options"
  });

  useEffect(() => {
    if (examId) {
      const examData = getExamById(examId);
      if (examData) {
        setExam(examData);
        setQuestions(examData.questions);
      }
      setLoading(false);
    }
  }, [examId]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newQuestion: Question = {
        id: questions.length + 1,
        question: values.question,
        options: values.options.map(o => o.value),
        correctAnswer: values.correctAnswer,
    };
    setQuestions(prev => [...prev, newQuestion]);
    toast({
      title: "Question Added!",
      description: "The new question has been added to the exam.",
    });
    form.reset();
  }

  const handleDeleteQuestion = (questionId: number) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
     toast({
      title: "Question Deleted!",
      description: "The question has been removed from the exam.",
      variant: "destructive"
    });
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
            <div className="ml-4">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Manage Questions</h1>
                <p className="text-muted-foreground">For Exam: {exam.title}</p>
            </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Question</CardTitle>
                    <CardDescription>Fill out the form to add a question.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                             <FormField
                                control={form.control}
                                name="question"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Question Text</FormLabel>
                                    <FormControl>
                                        <Input placeholder="What is 2 + 2?" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

                             <div>
                                <Label>Options</Label>
                                <div className="space-y-2 mt-2">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex items-center gap-2">
                                        <FormField
                                            control={form.control}
                                            name={`options.${index}.value`}
                                            render={({ field }) => (
                                            <Input {...field} placeholder={`Option ${index + 1}`} />
                                            )}
                                        />
                                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                </div>
                                <Button type="button" size="sm" variant="outline" className="mt-2" onClick={() => append({ value: "" })}>
                                   <PlusCircle className="h-4 w-4 mr-2" /> Add Option
                                </Button>
                             </div>
                             
                            <FormField
                                control={form.control}
                                name="correctAnswer"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                    <FormLabel>Correct Answer</FormLabel>
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-1">
                                        {form.watch('options').map((option, index) => (
                                             option.value && (
                                                <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value={option.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">{option.value || `Option ${index + 1}`}</FormLabel>
                                                </FormItem>
                                            )
                                        ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                           
                            <Button type="submit" className="w-full">Add Question</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Existing Questions</CardTitle>
                    <CardDescription>A list of questions already in this exam.</CardDescription>
                </CardHeader>
                <CardContent className="max-h-[600px] overflow-y-auto">
                    <div className="space-y-4">
                        {questions.map((q, index) => (
                             <div key={q.id} className="p-4 border rounded-lg flex justify-between items-start">
                                 <div>
                                    <p className="font-medium">{index+1}. {q.question}</p>
                                    <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                                        {q.options.map((opt, i) => (
                                            <li key={i} className={opt === q.correctAnswer ? 'font-bold text-primary' : ''}>
                                                {opt} {opt === q.correctAnswer && '(Correct)'}
                                            </li>
                                        ))}
                                    </ul>
                                 </div>
                                  <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteQuestion(q.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                             </div>
                        ))}
                        {questions.length === 0 && <p className="text-center text-muted-foreground">No questions added yet.</p>}
                    </div>
                </CardContent>
                 <CardFooter className="flex justify-end">
                    <Button onClick={() => router.push('/admin/exams')}>Done</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
