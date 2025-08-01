
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, X, Plane, Info } from "lucide-react";
import { format, parseISO, startOfDay } from "date-fns";

type AttendanceStatus = "Present" | "Absent" | "Leave";

interface DailyRecord {
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  reason?: string;
}

const attendanceLog: DailyRecord[] = [
    // Previous months data...
    { date: "2024-06-03", status: "Present" },
    { date: "2024-06-04", status: "Present" },
    { date: "2024-06-05", status: "Absent", reason: "Unwell" },
    { date: "2024-06-06", status: "Present" },
    { date: "2024-06-07", status: "Present" },
    { date: "2024-06-10", status: "Present" },
    { date: "2024-06-11", status: "Leave", reason: "Family event" },
    { date: "2024-06-12", status: "Present" },
    { date: "2024-06-13", status: "Present" },
    { date: "2024-06-14", status: "Present" },
    { date: "2024-06-17", status: "Absent", reason: "Doctor's appointment" },
    { date: "2024-06-18", status: "Present" },
    { date: "2024-06-19", status: "Present" },
    { date: "2024-06-20", status: "Present" },
    { date: "2024-06-21", status: "Present" },
    { date: "2024-06-24", status: "Present" },
    { date: "2024-06-25", status: "Leave", reason: "Personal" },
    { date: "2024-06-26", status: "Present" },
    { date: "2024-06-27", status: "Present" },
    { date: "2024-06-28", status: "Present" },
    { date: "2024-07-01", status: "Present" },
    { date: "2024-07-02", status: "Present" },
    { date: "2024-07-03", status: "Present" },
    { date: "2024-07-04", status: "Leave", reason: "Public Holiday" },
    { date: "2024-07-05", status: "Present" },
    { date: "2024-07-08", status: "Present" },
    { date: "2024-07-09", status: "Present" },
    { date: "2024-07-10", status: "Absent", reason: "Sick day" },
    { date: "2024-07-11", status: "Present" },
    { date: "2024-07-12", status: "Present" },
    { date: "2024-07-15", status: "Present" },
];

export default function AttendancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { overallPercentage, totalPresent, totalAbsent, totalLeave, totalDays } = useMemo(() => {
    const totalDays = attendanceLog.length;
    const totalPresent = attendanceLog.filter(log => log.status === "Present").length;
    const totalAbsent = attendanceLog.filter(log => log.status === "Absent").length;
    const totalLeave = attendanceLog.filter(log => log.status === "Leave").length;
    const overallPercentage = totalDays > 0 ? Math.round((totalPresent / (totalDays-totalLeave)) * 100) : 0;
    
    return { overallPercentage, totalPresent, totalAbsent, totalLeave, totalDays };
  }, []);

  const leaves = useMemo(() => attendanceLog.filter(log => log.status === "Leave"), []);

  const selectedDayRecord = useMemo(() => {
    if (!date) return null;
    const selectedDayStart = startOfDay(date);
    return attendanceLog.find(log => startOfDay(parseISO(log.date)).getTime() === selectedDayStart.getTime());
  }, [date]);
  

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
        case "Present":
            return <Check className="h-8 w-8 text-green-500" />;
        case "Absent":
            return <X className="h-8 w-8 text-red-500" />;
        case "Leave":
            return <Plane className="h-8 w-8 text-blue-500" />;
        default:
            return <Info className="h-8 w-8 text-muted-foreground" />;
    }
  }

  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Attendance Details</h1>
            <p className="text-muted-foreground mt-1">View your day-wise attendance and leave records.</p>
        </header>

         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Overall Percentage</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{overallPercentage}%</div>
                    <p className="text-xs text-muted-foreground">Based on attended classes</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Present</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">{totalPresent}</div>
                     <p className="text-xs text-muted-foreground">Out of {totalDays} working days</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Absent</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">{totalAbsent}</div>
                    <p className="text-xs text-muted-foreground">Marked as absent</p>
                </CardContent>
            </Card>
            <Dialog>
                <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Leaves</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{totalLeave}</div>
                            <p className="text-xs text-muted-foreground">Approved leaves</p>
                        </CardContent>
                    </Card>
                </DialogTrigger>
                <DialogContent>
                     <DialogHeader>
                        <DialogTitle>Leave History</DialogTitle>
                     </DialogHeader>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Reason</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaves.map((leave, index) => (
                                <TableRow key={index}>
                                    <TableCell>{format(new Date(leave.date), "PPP")}</TableCell>
                                    <TableCell className="font-medium">{leave.reason}</TableCell>
                                </TableRow>
                            ))}
                            {leaves.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={2} className="text-center text-muted-foreground">No leaves taken.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Select a Date</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                            defaultMonth={new Date()}
                        />
                    </CardContent>
                </Card>
            </div>
             <div className="md:col-span-2">
                 <Card className="min-h-[350px]">
                    <CardHeader>
                        <CardTitle>Status for {date ? format(date, "PPP") : "selected date"}</CardTitle>
                        <CardDescription>Your attendance status for the selected day.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center h-full gap-4">
                        {selectedDayRecord ? (
                            <>
                                {getStatusIcon(selectedDayRecord.status)}
                                <Badge variant={
                                    selectedDayRecord.status === 'Present' ? 'default' : 
                                    selectedDayRecord.status === 'Absent' ? 'destructive' : 'secondary'
                                } className="text-xl px-4 py-2">
                                    {selectedDayRecord.status}
                                </Badge>
                                {selectedDayRecord.reason && (
                                    <p className="text-muted-foreground text-center">
                                        <strong>Reason:</strong> {selectedDayRecord.reason}
                                    </p>
                                )}
                            </>
                        ) : (
                             <div className="text-center text-muted-foreground">
                                <Info className="h-8 w-8 mx-auto mb-2" />
                                <p>No record found for this day.</p>
                                <p className="text-xs">(It might be a holiday or a non-working day)</p>
                             </div>
                        )}
                    </CardContent>
                 </Card>
            </div>
        </div>
    </div>
  );

    