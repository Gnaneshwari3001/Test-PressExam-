
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy, Cpu, Database, Globe, HardDrive, Lock, Network, PenTool, Puzzle, Shield, Waypoints } from "lucide-react";

const subjects = [
    { name: "Data Structures", icon: <Waypoints className="h-8 w-8 text-primary" /> },
    { name: "Algorithms", icon: <Puzzle className="h-8 w-8 text-primary" /> },
    { name: "Operating Systems", icon: <HardDrive className="h-8 w-8 text-primary" /> },
    { name: "Computer Networks", icon: <Network className="h-8 w-8 text-primary" /> },
    { name: "DBMS", icon: <Database className="h-8 w-8 text-primary" /> },
    { name: "Software Engineering", icon: <PenTool className="h-8 w-8 text-primary" /> },
    { name: "Object-Oriented Programming", icon: <BookCopy className="h-8 w-8 text-primary" /> },
    { name: "Web Technologies", icon: <Globe className="h-8 w-8 text-primary" /> },
    { name: "Compiler Design", icon: <Cpu className="h-8 w-8 text-primary" /> },
    { name: "Artificial Intelligence", icon: <Cpu className="h-8 w-8 text-primary" /> },
    { name: "Machine Learning", icon: <Cpu className="h-8 w-8 text-primary" /> },
    { name: "Cybersecurity & Cryptography", icon: <Shield className="h-8 w-8 text-primary" /> },
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
          <Card key={subject.name} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">{subject.name}</CardTitle>
              {subject.icon}
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Manage exams and questions for this subject.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
