
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Book, HelpCircle } from "lucide-react";
import type { Exam } from "@/lib/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface ExamCardProps {
  exam: Exam;
}

export default function ExamCard({ exam }: ExamCardProps) {
  const router = useRouter();

  const handleStartExamClick = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push(`/exams/${exam.id}`);
      } else {
        router.push("/login");
      }
    });
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline">{exam.title}</CardTitle>
          <Badge variant={exam.level === 'Beginner' ? 'secondary' : exam.level === 'Intermediate' ? 'default' : 'destructive'}>{exam.level}</Badge>
        </div>
        <CardDescription>{exam.subject}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          <span>{exam.duration} minutes</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>{exam.questionCount} questions</span>
        </div>
         <div className="flex items-center text-sm text-muted-foreground">
          <Book className="mr-2 h-4 w-4" />
          <span>{exam.subject}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleStartExamClick}>
          Start Exam
        </Button>
      </CardFooter>
    </Card>
  );
}
