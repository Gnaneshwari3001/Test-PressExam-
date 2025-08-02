
"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { get, ref } from "firebase/database";
import { database } from "@/lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, User, Mail, Shield, BookOpen, CheckCircle, Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UserProfile {
    uid: string;
    name: string;
    email: string;
    role: 'student' | 'instructor' | 'admin';
    photoURL?: string;
    bio?: string;
}

// Mock data for student performance
const recentActivity = [
  { exam: "Introduction to Algebra", score: 85, date: "2023-10-26" },
  { exam: "Basics of Physics", score: 92, date: "2023-10-24" },
  { exam: "World War II", score: 78, date: "2023-10-22" },
];


export default function StudentProfilePage() {
    const params = useParams();
    const router = useRouter();
    const userId = params.id as string;

    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            const fetchUserData = async () => {
                const userRef = ref(database, `users/${userId}`);
                try {
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        setUser({ uid: userId, ...snapshot.val() });
                    } else {
                        console.error("User not found");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUserData();
        }
    }, [userId]);

    if (loading) {
        return <Skeleton className="w-full h-96" />;
    }

    if (!user) {
        return <div>User not found.</div>;
    }

  return (
    <div>
        <header className="flex items-center mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight font-headline ml-4">User Profile</h1>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader className="items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={user.photoURL} alt={user.name} />
                            <AvatarFallback className="text-3xl">{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{user.name}</CardTitle>
                        <CardDescription>
                             <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'instructor' ? 'default' : 'secondary'} className="capitalize mt-1">
                                {user.role}
                            </Badge>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5" />
                            <span>UID: {user.uid}</span>
                        </div>
                         {user.bio && (
                            <p className="text-sm pt-2 border-t mt-4">{user.bio}</p>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Academic Summary</CardTitle>
                        <CardDescription>An overview of the student's performance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="grid gap-6 md:grid-cols-3 mb-8">
                             <Card className="bg-secondary/50">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Exams Taken</CardTitle>
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">12</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-secondary/50">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                                    <Percent className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">88%</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-secondary/50">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Certificates</CardTitle>
                                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">4</div>
                                </CardContent>
                            </Card>
                        </div>

                        <h3 className="font-semibold mb-4">Recent Activity</h3>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Exam</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead className="text-right">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentActivity.map((activity, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{activity.exam}</TableCell>
                                        <TableCell>{activity.score}%</TableCell>
                                        <TableCell className="text-right">{activity.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}
