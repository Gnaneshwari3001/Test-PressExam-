
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


// Mock data for recent results and answers
const recentResults = [
  { id: "math-101", exam: "Introduction to Algebra", score: 85, date: "2023-10-26" },
  { id: "science-101", exam: "Basics of Physics", score: 92, date: "2023-10-24" },
  { id: "history-201", exam: "World War II", score: 78, date: "2023-10-22" },
  { id: "geography-101", exam: "World Capitals", score: 95, date: "2023-10-20" },
];

// Mock user answers for a specific exam for demonstration
const mockUserAnswers: { [key: string]: { [key: number]: string } } = {
  "math-101": { 1: "4", 2: "15", 3: "3.14", 4: "144", 5: "9", 6: "25", 7: "10", 8: "10", 9: "20", 10: "0.75", 11: "9", 12: "24", 13: "120", 14: "5x", 15: "180 degrees", 16: "6", 17: "8", 18: "11", 19: "100", 20: "0", 21: "6", 22: "56", 23: "Right", 24: "5/2", 25: "180 km", 26: "5", 27: "5", 28: "Both 2πr and πd", 29: "20", 30: "12", 31: "Right-angled", 32: "1", 33: "20", 34: "6", 35: "4", 36: "4", 37: "40", 38: "1/2", 39: "5", 40: "3", 41: "Octagon", 42: "20%", 43: "18", 44: "20", 45: "27", 46: "3:5", 47: "180", 48: "1", 49: "200", 50: "6", 51: "x^2 + 2xy + y^2", 52: "2", 53: "100", 54: "0.75", 55: "Obtuse", 56: "45", 57: "It is constant", 58: "12", 59: "63", 60: "$25" },
  "science-101": { 1: "F=ma", 2: "Joule", 3: "Mars", 4: "H2O", 5: "300,000 km/s", 6: "Albert Einstein", 7: "Nucleus", 8: "Gravity", 9: "100°C", 10: "Carbon Dioxide", 11: "8", 12: "Diamond", 13: "Photosynthesis", 14: "Solar Power", 15: "Nitrogen", 16: "Thermometer", 17: "Skin", 18: "Steel", 19: "Au", 20: "Root", 21: "Isaac Newton", 22: "Kinetic", 23: "7", 24: "Paleontology", 25: "Calcium", 26: "The tilt of the Earth's axis", 27: "0°C", 28: "Mitochondria", 29: "Black", 30: "Hydrogen", 31: "The moon's gravity", 32: "An animal with a backbone", 33: "Ohm", 34: "Copper", 35: "37°C", 36: "Meteorology", 37: "Solid, Liquid, Gas", 38: "Jupiter", 39: "Semicircular canals", 40: "Chlorophyll", 41: "Milky Way", 42: "Evaporation", 43: "Vitamin D", 44: "To filter waste from blood", 45: "A mixture of a metal with at least one other element", 46: "Earthquake intensity", 47: "NaCl", 48: "Whale", 49: "Hydrogen", 50: "Annual ring", 51: "Gregor Mendel", 52: "Weight", 53: "First Law", 54: "Igneous", 55: "Entomology", 56: "Mercury", 57: "Hertz (Hz)", 58: "Carry oxygen", 59: "Condensation", 60: "Mercury" },
  "history-201": { 1: "1939", 2: "Invasion of Poland", 3: "Winston Churchill", 4: "Soviet Union", 5: "Operation Overlord", 6: "December 7, 1941", 7: "Battle of Midway", 8: "Joseph Stalin", 9: "The Manhattan Project", 10: "Hiroshima and Nagasaki", 11: "Lightning War", 12: "Luftwaffe", 13: "Franklin D. Roosevelt", 14: "1940", 15: "Anschluss", 16: "Battle of Stalingrad", 17: "The Nazi plan for the genocide of the Jews", 18: "Dwight D. Eisenhower", 19: "Treaty of Versailles", 20: "Ethiopia", 21: "The Phoney War", 22: "Gestapo", 23: "The Lend-Lease Act", 24: "Charles de Gaulle", 25: "Poland", 26: "Battle of the Bulge", 27: "May 8, 1945", 28: "Hirohito", 29: "The Philippines", 30: "Bletchley Park", 31: "France", 32: "Harry S. Truman", 33: "Erwin Rommel", 34: "The fall of France", 35: "Vichy France", 36: "North Africa", 37: "Mein Kampf", 38: "Operation Barbarossa", 39: "To try Nazi war criminals", 40: "USA, UK, Soviet Union", 41: "Suicide planes", 42: "900 days", 43: "Douglas MacArthur", 44: "Germany and the Soviet Union", 45: "Tokyo", 46: "Finland", 47: "African American fighter pilots", 48: "Battle of the Coral Sea", 49: "Josip Broz Tito", 50: "A period of little military action on the Western Front", 51: "Auschwitz", 52: "In the air", 53: "National Socialist German Workers' Party", 54: "Benito Mussolini", 55: "It was a strategic island for US bombing raids on Japan", 56: "The plane that dropped the first atomic bomb", 57: "Poland", 58: "All of the above", 59: "United Nations", 60: "USS Missouri" },
  "geography-101": { 1: "Paris", 2: "Tokyo", 3: "Canberra", 4: "Ottawa", 5: "Brasília", 6: "Cairo", 7: "Moscow", 8: "New Delhi", 9: "Rome", 10: "Berlin", 11: "London", 12: "Beijing", 13: "Madrid", 14: "Buenos Aires", 15: "Seoul", 16: "Mexico City", 17: "Jakarta", 18: "Ankara", 19: "Pretoria", 20: "Bangkok", 21: "Athens", 22: "Lisbon", 23: "Stockholm", 24: "Oslo", 25: "Helsinki", 26: "Copenhagen", 27: "Amsterdam", 28: "Brussels", 29: "Bern", 30: "Vienna", 31: "Dublin", 32: "Wellington", 33: "Manila", 34: "Hanoi", 35: "Kuala Lumpur", 36: "Riyadh", 37: "Abu Dhabi", 38: "Doha", 39: "Jerusalem", 40: "Tehran", 41: "Baghdad", 42: "Abuja", 43: "Nairobi", 44: "Rabat", 45: "Algiers", 46: "Tunis", 47: "Tripoli", 48: "Santiago", 49: "Lima", 50: "Bogotá", 51: "Caracas", 52: "Havana", 53: "Kingston", 54: "Warsaw", 55: "Budapest", 56: "Prague", 57: "Bucharest", 58: "Sofia", 59: "Kyiv", 60: "Minsk" }
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
    // Simulate taking the exam to populate storage
    const examData = getExamById(examId);
    const answers = mockUserAnswers[examId];
    if (examData && answers) {
      localStorage.setItem(`exam_answers_${examId}`, JSON.stringify(answers));
      sessionStorage.setItem(`exam_questions_${examId}`, JSON.stringify(examData.questions));
    }
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

    