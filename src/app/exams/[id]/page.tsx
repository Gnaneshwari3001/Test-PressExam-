"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { getExamById } from "@/lib/data";
import type { Exam, Question } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronLeft, ChevronRight, Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Skeleton } from "@/components/ui/skeleton";


// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function TakeExamPage() {
  const router = useRouter();
  const params = useParams();
  const examId = params.id as string;
  
  const [exam, setExam] = useState<Exam | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const examData = getExamById(examId);
        if (examData) {
          const questions = shuffleArray(examData.questions);
          setExam({...examData, questions});
          setShuffledQuestions(questions);
          setTimeLeft(examData.duration * 60);
        } else {
          router.push('/404');
        }
        setIsLoading(false);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [examId, router]);

  const handleSubmit = useCallback(() => {
    if (!exam) return;
    localStorage.setItem(`exam_answers_${exam.id}`, JSON.stringify(answers));
    // Pass shuffled questions to results page
    sessionStorage.setItem(`exam_questions_${exam.id}`, JSON.stringify(shuffledQuestions));
    router.push(`/results/${exam.id}`);
  }, [exam, answers, router, shuffledQuestions]);

  useEffect(() => {
    if (isLoading || timeLeft <= 0) {
        if(timeLeft <= 0 && exam) {
            handleSubmit();
        }
        return;
    };
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading, timeLeft, exam, handleSubmit]);

  if (isLoading || !exam || !user) {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex justify-center">
                <div className="space-y-8 w-full max-w-4xl">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        </div>
    );
  }

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-headline text-2xl">{exam.title}</CardTitle>
            <div className="flex items-center text-lg font-semibold text-primary">
              <Clock className="mr-2 h-6 w-6" />
              <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </div>
          </div>
          <CardDescription>Question {currentQuestionIndex + 1} of {shuffledQuestions.length}</CardDescription>
          <Progress value={progress} className="w-full mt-2" />
        </CardHeader>
        <CardContent className="min-h-[300px]">
          <div className="space-y-6">
            <p className="text-lg font-medium">{currentQuestion.question}</p>
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              className="space-y-2"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-base cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          {currentQuestionIndex === shuffledQuestions.length - 1 ? (
            <Button className="bg-accent hover:bg-accent/90" onClick={() => setShowSubmitConfirm(true)}>
              <Check className="h-4 w-4 mr-2" /> Submit
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>

      <AlertDialog open={showSubmitConfirm} onOpenChange={setShowSubmitConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
            <AlertDialogDescription>
              You cannot change your answers after submitting. Please review your answers before proceeding.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
             <Button variant="ghost" onClick={() => setShowSubmitConfirm(false)}>Cancel</Button>
             <AlertDialogAction onClick={handleSubmit} className="bg-accent hover:bg-accent/90">Confirm & Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
