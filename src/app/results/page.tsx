"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { FileEdit, History, BookOpenCheck } from "lucide-react";

const recentResults = [
  { id: 1, exam: "Introduction to Algebra", score: 85, date: "2023-10-26" },
  { id: 2, exam: "Basics of Physics", score: 92, date: "2023-10-24" },
  { id: 3, exam: "World War II", score: 78, date: "2023-10-22" },
  { id: 4, exam: "World Capitals", score: 95, date: "2023-10-20" },
];

const chartData = [
  { name: "Algebra", score: 85 },
  { name: "Physics", score: 92 },
  { name: "History", score: 78 },
  { name: "Geography", score: 95 },
  { name: "Literature", score: 88 },
];

export default function ResultsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Exam History</h1>
        <p className="text-muted-foreground mt-2">Review your past exam results and performance.</p>
      </header>
      
      <div className="grid gap-8 lg:grid-cols-3">
        
        <div className="lg:col-span-2 space-y-8">
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
                        <Link href={`/results/${result.id}`}>
                            <Button variant="ghost" size="sm">View Details</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Your average scores across different subjects.</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        />
                        <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                        />
                        <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4">
                    <Link href="/exams" passHref>
                        <Button className="w-full"><BookOpenCheck className="mr-2 h-4 w-4"/>Take a New Exam</Button>
                    </Link>
                    <Link href="/dashboard" passHref>
                        <Button variant="secondary" className="w-full"><History className="mr-2 h-4 w-4"/>Back to Dashboard</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
