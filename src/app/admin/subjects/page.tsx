
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookCopy, Cpu, Database, Globe, HardDrive, Network, PenTool, Puzzle, Shield, Waypoints, Download, PlayCircle } from "lucide-react";
import Link from "next/link";

const subjects = [
    { name: "Data Structures", icon: <Waypoints className="h-8 w-8 text-primary" />, examId: "cs-202" },
    { name: "Algorithms", icon: <Puzzle className="h-8 w-8 text-primary" />, examId: "cs-202" },
    { name: "Operating Systems", icon: <HardDrive className="h-8 w-8 text-primary" />, examId: "cs-202" },
    { name: "Computer Networks", icon: <Network className="h-8 w-8 text-primary" />, examId: "cs-202" },
    { name: "DBMS", icon: <Database className="h-8 w-8 text-primary" />, examId: "cs-202" },
    { name: "Software Engineering", icon: <PenTool className="h-8 w-8 text-primary" />, examId: "cs-202" },
    { name: "Object-Oriented Programming", icon: <BookCopy className="h-8 w-8 text-primary" />, examId: "cs-301" },
    { name: "Web Technologies", icon: <Globe className="h-8 w-8 text-primary" />, examId: "cs-301" },
    { name: "Compiler Design", icon: <Cpu className="h-8 w-8 text-primary" />, examId: "cs-301" },
    { name: "Artificial Intelligence", icon: <Cpu className="h-8 w-8 text-primary" />, examId: "cs-301" },
    { name: "Machine Learning", icon: <Cpu className="h-8 w-8 text-primary" />, examId: "cs-301" },
    { name: "Cybersecurity & Cryptography", icon: <Shield className="h-8 w-8 text-primary" />, examId: "cs-301" },
];


export default function SubjectsPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Platform Subjects</h1>
        <p className="text-muted-foreground mt-1">An overview of all subjects available for creating exams.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.name} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">{subject.name}</CardTitle>
              {subject.icon}
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-xs text-muted-foreground">Manage exams and questions for this subject.</p>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-2">
                <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Materials</Button>
                <Link href={`/exams/${subject.examId}`} passHref>
                    <Button className="w-full"><PlayCircle className="mr-2 h-4 w-4" /> Take Exam</Button>
                </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
