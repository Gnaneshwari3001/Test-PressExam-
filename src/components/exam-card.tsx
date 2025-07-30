import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Book, HelpCircle } from "lucide-react";
import type { Exam } from "@/lib/types";

interface ExamCardProps {
  exam: Exam;
}

export default function ExamCard({ exam }: ExamCardProps) {
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
        <Link href={`/exams/${exam.id}`} className="w-full">
          <Button className="w-full bg-accent hover:bg-accent/90">
            Start Exam
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
