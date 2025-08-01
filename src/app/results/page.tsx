
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    51: "x^2 + 2xy + y^2", 52: "2", 53: "100", 54: "0.75", 55: "Obtuse", 56: "45", 57: "It is constant", 58: "12", 59: "63", 60: "$25"
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
  const router = useRouter();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
       if (!currentUser) {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleViewDetails = (examId: string) => {
    router.push(`/results/${examId}`);
  };

  if (authLoading) {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <Skeleton className="h-12 w-1/4 mb-8" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }
  
  if (!user) {
    return null; // Redirect is handled in the useEffect
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
                <CardDescription>Your performance across all exams taken. Click 'View Details' for an in-depth analysis.</CardDescription>
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
                            <Button variant="outline" size="sm" onClick={() => handleViewDetails(result.id)}>
                                View Details
                            </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                    <TableRow>
                        <TableCell className="font-medium text-muted-foreground">Introduction to Data Structures</TableCell>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                            Not Attended
                        </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
