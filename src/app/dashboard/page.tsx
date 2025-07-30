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
];

const upcomingExams = [
    { id: "literature-301", title: "Shakespearean Tragedies", subject: "Literature", date: "2023-11-05" },
    { id: "cs-202", title: "Data Structures & Algorithms", subject: "Computer Science", date: "2023-11-10" },
]

const chartData = [
  { name: "Algebra", score: 85 },
  { name: "Physics", score: 92 },
  { name: "History", score: 78 },
  { name: "Geography", score: 95 },
  { name: "Literature", score: 88 },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Student Dashboard</h1>
      </header>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://placehold.co/128x128.png" alt="Student" data-ai-hint="person happy" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">Jane Doe</CardTitle>
                <CardDescription>jane.doe@example.com</CardDescription>
              </div>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <FileEdit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Exams</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {upcomingExams.map(exam => (
                    <li key={exam.id} className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">{exam.title}</p>
                            <p className="text-sm text-muted-foreground">{exam.subject} - {exam.date}</p>
                        </div>
                        <Link href={`/exams/${exam.id}`}>
                            <Button size="sm" variant="ghost">Start</Button>
                        </Link>
                    </li>
                ))}
              </ul>
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
                <Link href="/results" passHref>
                    <Button variant="secondary" className="w-full"><History className="mr-2 h-4 w-4"/>View Exam History</Button>
                </Link>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Results</CardTitle>
              <CardDescription>Your performance in the last few exams.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead className="text-right">Date</TableHead>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
              <CardDescription>Your scores across different subjects.</CardDescription>
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
        </div>
      </div>
    </div>
  );
}
