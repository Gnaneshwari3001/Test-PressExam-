"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpenCheck, History, User, Edit } from "lucide-react";
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="space-y-8">
                <Skeleton className="h-24 w-1/2" />
                <div className="grid gap-8 md:grid-cols-2">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
      </div>
    );
  }

  if (!user) {
    return null; 
  }
  
  const displayName = user.displayName || user.email?.split('@')[0] || 'User';

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Welcome, {displayName}!
        </h1>
        <p className="text-muted-foreground mt-2">What would you like to do today?</p>
      </header>
      
      <div className="grid gap-8 md:grid-cols-2">
        
        <Card className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <User className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">For Students</CardTitle>
            </div>
            <CardDescription>Access exams, review your results, and track your learning progress.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/exams" passHref>
                <Button className="w-full justify-start p-6 text-lg"><BookOpenCheck className="mr-4 h-5 w-5"/>Take a New Exam</Button>
            </Link>
            <Link href="/results" passHref>
                <Button variant="secondary" className="w-full justify-start p-6 text-lg"><History className="mr-4 h-5 w-5"/>View Exam History</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
                 <div className="bg-accent/10 p-3 rounded-full">
                    <Edit className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl">For Instructors</CardTitle>
            </div>
            <CardDescription>Create, manage, and distribute exams to your students seamlessly.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
             <Link href="/admin" passHref>
                <Button variant="default" className="w-full justify-start p-6 text-lg bg-accent hover:bg-accent/90"><Edit className="mr-4 h-5 w-5"/>Create & Manage Exams</Button>
            </Link>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
