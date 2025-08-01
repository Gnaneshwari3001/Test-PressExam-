
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CalendarCheck, Percent, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const attendanceData = [
    { subject: "Data Structures", total: 45, attended: 42, percentage: 93 },
    { subject: "Algorithms", total: 40, attended: 38, percentage: 95 },
    { subject: "Operating Systems", total: 42, attended: 35, percentage: 83 },
    { subject: "Computer Networks", total: 38, attended: 37, percentage: 97 },
    { subject: "DBMS", total: 48, attended: 48, percentage: 100 },
    { subject: "Software Engineering", total: 35, attended: 30, percentage: 86 },
];

const overallPercentage = Math.round(
    attendanceData.reduce((acc, item) => acc + item.attended, 0) /
    attendanceData.reduce((acc, item) => acc + item.total, 0) * 100
);

export default function AttendancePage() {
  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Attendance</h1>
            <p className="text-muted-foreground mt-1">Your attendance record for the current semester.</p>
        </header>

         <div className="grid gap-6 md:grid-cols-3 mb-8">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
                    <Percent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{overallPercentage}%</div>
                    <Progress value={overallPercentage} className="mt-2 h-2"/>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
                    <Check className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{attendanceData.reduce((acc, item) => acc + item.attended, 0)}</div>
                    <p className="text-xs text-muted-foreground">Out of {attendanceData.reduce((acc, item) => acc + item.total, 0)} total classes</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Classes Missed</CardTitle>
                    <X className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                     <div className="text-2xl font-bold">{attendanceData.reduce((acc, item) => acc + (item.total - item.attended), 0)}</div>
                    <p className="text-xs text-muted-foreground">Across all subjects</p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarCheck /> Subject-wise Record</CardTitle>
            <CardDescription>Detailed attendance for each subject.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Total Classes</TableHead>
                            <TableHead>Attended</TableHead>
                            <TableHead>Missed</TableHead>
                            <TableHead className="text-right">Percentage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendanceData.map((record) => (
                            <TableRow key={record.subject}>
                                <TableCell className="font-medium">{record.subject}</TableCell>
                                <TableCell>{record.total}</TableCell>
                                <TableCell>{record.attended}</TableCell>
                                <TableCell>{record.total - record.attended}</TableCell>
                                <TableCell className="text-right">
                                     <Badge variant={record.percentage > 75 ? "default" : "destructive"}>
                                        {record.percentage}%
                                    </Badge>
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
