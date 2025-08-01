
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Edit } from "lucide-react";
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth, database } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { ref, get } from 'firebase/database';

export default function DashboardPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = ref(database, 'users/' + currentUser.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.role === 'instructor' || userData.role === 'admin') {
             router.push('/admin');
          } else {
             router.push('/student/dashboard');
          }
        } else {
            // Handle case where user data doesn't exist in DB
            router.push('/login');
        }
        setUser(currentUser);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading || !user) {
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

  // This part will likely not be reached due to redirection, but it's good practice to keep it.
  const displayName = user.displayName || user.email?.split('@')[0] || 'User';

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Welcome, {displayName}!
        </h1>
        <p className="text-muted-foreground mt-2">Redirecting to your dashboard...</p>
      </header>
    </div>
  );
}
