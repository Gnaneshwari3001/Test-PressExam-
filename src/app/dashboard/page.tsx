
"use client";

import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth, database } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { ref, get } from 'firebase/database';

export default function DashboardPage() {
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
          } else if (userData.role === 'student') {
             router.push('/student/dashboard');
          } else {
            // Default redirect if role is not defined
            router.push('/login');
          }
        } else {
            // Handle case where user data doesn't exist in DB
            console.error("User data not found in database for UID:", currentUser.uid);
            router.push('/login');
        }
      } else {
        router.push('/login');
      }
      // We don't setLoading(false) here because the redirection should happen.
      // The skeleton is a fallback for the brief moment before redirection.
    });
    // Set a timeout to stop loading state in case redirection fails for some reason
    const timer = setTimeout(() => setLoading(false), 5000);

    return () => {
        unsubscribe();
        clearTimeout(timer);
    }
  }, [router]);

  return (
      <div className="container mx-auto px-4 py-12 md:px-6">
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight font-headline">
              Welcome!
            </h1>
            <p className="text-muted-foreground mt-2">Please wait while we redirect you to your dashboard...</p>
          </header>
          <div className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-64 w-full" />
              </div>
          </div>
    </div>
  );
}
