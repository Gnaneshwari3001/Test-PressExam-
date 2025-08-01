
"use client";

import { useState, useEffect } from "react";
import { getExamById } from "@/lib/data";
import type { AnalyzeExamResultsOutput } from "@/ai/flows/analyze-exam-results";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertCircle, Lightbulb, BarChart2, Download, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import type { Exam, Question } from "@/lib/types";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ScoreCard from "@/components/score-card";
import { analyzeExamResults, AnalyzeExamResultsInput } from "@/ai/flows/analyze-exam-results";

// Mock data for recent results and answers
const recentResults = [
  { id: "math-101", exam: "Introduction to Algebra", score: 85, date: "2023-10-26" },
  { id: "science-101", exam: "Basics of Physics", score: 92, date: "2023-10-24" },
  { id: "history-201", exam: "World War II", score: 78, date: "2023-10-22" },
  { id: "geography-101", exam: "World Capitals", score: 95, date: "2023-10-20" },
];

// Mock user answers for a specific exam for demonstration
const mockUserAnswers: { [key: number]: string } = {
    1: "4", 2: "15", 3: "3.14", 4: "144", 5: "9", 6: "25", 7: "10", 8: "10", 9: "20", 10: "0.75",
    11: "9", 12: "24", 13: "120", 14: "5x", 15: "180 degrees", 16: "6", 17: "8", 18: "11", 19: "100", 20: "0",
    21: "6", 22: "56", 23: "Right", 24: "5/2", 25: "180 km", 26: "5", 27: "5", 28: "Both 2πr and πd", 29: "20", 30: "12",
    31: "Right-angled", 32: "1", 33: "20", 34: "6", 35: "4", 36: "4", 37: "40", 38: "1/2", 39: "5", 40: "3",
    41: "Octagon", 42: "20%", 43: "18", 44: "20", 45: "27", 46: "3:5", 47: "180", 48: "1", 49: "200", 50: "6",
    51: "x^2 + 2xy + y^2", 52: "3", 53: "100", 54: "0.75", 55: "Obtuse", 56: "45", 57: "It is constant", 58: "12", 59: "63", 60: "25"
};

type AnalysisResult = {
  analysis: AnalyzeExamResultsOutput;
  userAnswers: { [key: number]: string };
  exam: Exam;
};

export default function ResultsListPage() {
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleViewDetails = async (examId: string) => {
    if (!user) {
        setError("You must be logged in to view results.");
        return;
    }
    setSelectedExamId(examId);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const exam = getExamById(examId);
      if (!exam) {
        throw new Error("Exam not found");
      }
      
      const resultsForAnalysis = exam.questions.map(q => ({
        question: q.question,
        answer: mockUserAnswers[q.id] || "No answer",
        isCorrect: (mockUserAnswers[q.id] || "No answer") === q.correctAnswer,
      }));

      const analysisInput: AnalyzeExamResultsInput = {
        examName: exam.title,
        studentName: user.displayName ?? 'Student',
        results: resultsForAnalysis,
      };
    
      const analysis = await analyzeExamResults(analysisInput);

      setResult({
        analysis,
        userAnswers: mockUserAnswers,
        exam,
      });

    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
      setError(`Failed to analyze results: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <Skeleton className="w-full h-96" />;
  }
  
  if (!user) {
    return (
       <div className="container mx-auto px-4 py-12 md:px-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>Please log in to view your marks.</AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
            <Link href="/login">
                <Button>Login</Button>
            </Link>
        </div>
      </div>
    )
  }

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
            <Button onClick={() => setSelectedExamId(null)}>Back to Marks</Button>
        </div>
      </div>
    );
  }

  if (selectedExamId && result) {
    const { analysis, userAnswers, exam } = result;
    const chartData = [
      { name: "Correct", value: analysis.overallScore, fill: "hsl(var(--primary))" },
      { name: "Incorrect", value: exam.questionCount - analysis.overallScore, fill: "hsl(var(--destructive))" },
    ];
    const scorePercentage = Math.round((analysis.overallScore / exam.questionCount) * 100);

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
                <header className="mb-12">
                     <Button variant="ghost" onClick={() => setSelectedExamId(null)} className="mb-4">
                        <ChevronLeft className="h-4 w-4 mr-2" /> Back to All Marks
                    </Button>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-center">
                        Exam Results
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl text-center">
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
                                <RechartsBarChart data={chartData} layout="vertical" margin={{left: 20}}>
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" stroke="hsl(var(--foreground))" axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{backgroundColor: 'hsl(var(--background))'}}/>
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                                </RechartsBarChart>
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
                                                {!isCorrect && (
                                                    <p className="text-sm flex items-center gap-2 text-primary">
                                                        <CheckCircle className="h-4 w-4 shrink-0"/> 
                                                        <span>Correct answer: {q.correctAnswer}</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                </div>
            </div>
        </>
    );
  }

  // Default view: list of results
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
       <div className="flex items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Exam History</h1>
      </div>
      <p className="text-muted-foreground mt-2 mb-8">Review your past exam results and performance.</p>
      
        <Card>
            <CardHeader>
                <CardTitle>All Results</CardTitle>
                <CardDescription>Your performance across all exams taken.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Exam</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentResults.map((result) => (
                    <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.exam}</TableCell>
                        <TableCell className="text-center">
                        <Badge variant={result.score > 80 ? "default" : "secondary"}>
                            {result.score}%
                        </Badge>
                        </TableCell>
                        <TableCell className="text-right">{result.date}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleViewDetails(result.id)}>
                                View Details
                            </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
