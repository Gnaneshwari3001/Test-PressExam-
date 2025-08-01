"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAnalysis } from "@/app/results/actions";
import type { AnalyzeExamResultsOutput } from "@/ai/flows/analyze-exam-results";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertCircle, Lightbulb, BarChart2, Download } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import type { Exam } from "@/lib/types";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import ScoreCard from "@/components/score-card";


type AnalysisResult = {
  analysis: AnalyzeExamResultsOutput;
  userAnswers: { [key: number]: string };
  exam: Exam;
};

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
    });

    const fetchResults = async () => {
      const storedAnswers = localStorage.getItem(`exam_answers_${examId}`);
      if (!storedAnswers) {
        setError("No answers found for this exam. Please take the exam first.");
        setLoading(false);
        return;
      }

      try {
        const userAnswers = JSON.parse(storedAnswers);
        // Wait for user to be set before calling getAnalysis
        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            if(currentUser) {
                const response = await getAnalysis(examId, userAnswers, currentUser.displayName ?? 'Student');

                if (response.success && response.analysis && response.exam) {
                    setResult({
                        analysis: response.analysis,
                        userAnswers: response.userAnswers,
                        exam: response.exam,
                    });
                } else {
                    setError(response.error || "Failed to load results.");
                }
                setLoading(false);
            }
        });
        return () => unsubscribeAuth();

      } catch (e) {
        setError("An unexpected error occurred while fetching results.");
        setLoading(false);
      }
    };

    fetchResults();
    return () => unsubscribe();
  }, [examId, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="space-y-8">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6 no-print">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
            <Link href="/exams">
                <Button>Back to Exams</Button>
            </Link>
        </div>
      </div>
    );
  }

  if (!result || !user) {
    return null;
  }

  const { analysis, userAnswers, exam } = result;
  const chartData = [
    { name: "Correct", value: analysis.overallScore, fill: "hsl(var(--primary))" },
    { name: "Incorrect", value: exam.questionCount - analysis.overallScore, fill: "hsl(var(--destructive))" },
  ];
  
  const scorePercentage = Math.round((analysis.overallScore / exam.questionCount) * 100)

  return (
    <>
      <div className="print-only hidden">
        <ScoreCard 
            studentName={user.displayName ?? "Student"}
            examTitle={exam.title}
            subject={exam.subject}
            score={scorePercentage}
        />
      </div>
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 no-print">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
            Exam Results
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
            Here's a breakdown of your performance in the "{exam.title}" exam.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart2/> Your Score</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8 md:grid-cols-2">
                  <div className="text-center">
                      <p className="text-6xl font-bold text-primary">{scorePercentage}%</p>
                      <p className="text-muted-foreground">{analysis.overallScore} out of {exam.questionCount} correct</p>
                  </div>
                  <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} layout="vertical" margin={{left: 20}}>
                              <XAxis type="number" hide />
                              <YAxis type="category" dataKey="name" stroke="hsl(var(--foreground))" axisLine={false} tickLine={false} />
                              <Tooltip cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{backgroundColor: 'hsl(var(--background))'}}/>
                              <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
              </CardContent>
              <CardDescription className="p-6 pt-0">
                  <Button className="w-full" onClick={() => window.print()}><Download className="mr-2 h-4 w-4"/> Download Scorecard</Button>
              </CardDescription>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb /> AI-Powered Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTitle>Detailed Feedback</AlertTitle>
                  <AlertDescription>{analysis.detailedFeedback}</AlertDescription>
                </Alert>
                <Alert variant="default" className="bg-accent/10">
                  <AlertTitle>Areas for Improvement</AlertTitle>
                  <AlertDescription>
                      <ul className="list-disc pl-5 space-y-1 mt-2">
                          {analysis.areasForImprovement.map((area, i) => (
                              <li key={i}>{area}</li>
                          ))}
                      </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

          </div>

          <div className="lg:col-span-1 space-y-6">
              <Card>
                  <CardHeader>
                      <CardTitle>Question Review</CardTitle>
                      <CardDescription>Review your answers below.</CardDescription>
                  </CardHeader>
                  <CardContent className="max-h-[800px] overflow-y-auto pr-4">
                      <div className="space-y-6">
                          {exam.questions.map((q, index) => {
                              const userAnswer = userAnswers[q.id];
                              const isCorrect = userAnswer === q.correctAnswer;
                              return (
                                  <div key={q.id} className="p-4 rounded-md border">
                                      <p className="font-medium">{index+1}. {q.question}</p>
                                      <div className="mt-2 space-y-2">
                                          <p className={`text-sm flex items-center gap-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                              {isCorrect ? <CheckCircle className="h-4 w-4 shrink-0"/> : <XCircle className="h-4 w-4 shrink-0" />}
                                              <span>Your answer: {userAnswer || <Badge variant="destructive">Not Answered</Badge>}</span>
                                          </p>
                                          <p className="text-sm flex items-center gap-2 text-primary">
                                              <CheckCircle className="h-4 w-4 shrink-0"/> 
                                              <span>Correct answer: {q.correctAnswer}</span>
                                          </p>
                                      </div>
                                  </div>
                              )
                          })}
                      </div>
                  </CardContent>
              </Card>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link href="/exams"><Button variant="outline">Take Another Exam</Button></Link>
        </div>
      </div>
    </>
  );
}
