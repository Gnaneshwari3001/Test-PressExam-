
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, TrendingUp, CheckCircle, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";


export default function GradePage() {
    const currentGPA = 3.8;
    const gpaGoal = 4.0;
    const progress = (currentGPA / gpaGoal) * 100;
  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">My Grade</h1>
            <p className="text-muted-foreground mt-1">An overview of your academic performance and standing.</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">3.8 / 4.0</div>
                    <p className="text-xs text-muted-foreground">Excellent Standing</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Progress to Goal</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{progress.toFixed(1)}%</div>
                    <Progress value={progress} className="mt-2 h-2"/>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">18 / 24</div>
                    <p className="text-xs text-muted-foreground">6 more to graduate</p>
                </CardContent>
            </Card>
        </div>

        <Card className="mt-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Award /> Academic Honors</CardTitle>
                <CardDescription>Recognitions for your academic achievements.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Dean's List - Fall 2023</li>
                    <li>Scholarship for Academic Excellence - 2023</li>
                    <li>Top Performer in "Data Structures"</li>
                </ul>
            </CardContent>
        </Card>
    </div>
  );
}
