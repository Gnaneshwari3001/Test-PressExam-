

"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Newspaper, Settings, FileClock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth, database } from "@/lib/firebase";
import { ref, get } from "firebase/database";

type UserRole = 'student' | 'instructor' | 'admin';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if(currentUser) {
            const userRef = ref(database, 'users/' + currentUser.uid);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                setUserRole(snapshot.val().role);
            }
        }
    });
    return () => unsubscribe();
  }, []);

  const pageTitle = userRole === 'admin' ? "Admin Dashboard" : "Instructor Dashboard";

  return (
    <div>
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">{pageTitle}</h1>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Link href="/admin/students">
              <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                      <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">User Management</CardTitle>
                          <Users className="h-5 w-5 text-muted-foreground" />
                      </div>
                  </CardHeader>
                  <CardContent>
                      <p className="text-sm text-muted-foreground">View, add, edit, and manage all users.</p>
                  </CardContent>
              </Card>
            </Link>
            <Link href="/admin/exams">
             <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Exam Management</CardTitle>
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Create, edit, and oversee all exams.</p>
                </CardContent>
            </Card>
            </Link>
             <Link href="/admin/content">
              <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                      <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Content Management</CardTitle>
                          <Newspaper className="h-5 w-5 text-muted-foreground" />
                      </div>
                  </CardHeader>
                  <CardContent>
                      <p className="text-sm text-muted-foreground">Manage subjects and static site pages.</p>
                  </CardContent>
              </Card>
            </Link>
             <Link href="/admin/settings">
              <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                      <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Platform Settings</CardTitle>
                          <Settings className="h-5 w-5 text-muted-foreground" />
                      </div>
                  </CardHeader>
                  <CardContent>
                      <p className="text-sm text-muted-foreground">Configure global exam policies and themes.</p>
                  </CardContent>
              </Card>
            </Link>
             <Link href="/admin/logs">
              <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                      <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Audit Logs</CardTitle>
                          <FileClock className="h-5 w-5 text-muted-foreground" />
                      </div>
                  </CardHeader>
                  <CardContent>
                      <p className="text-sm text-muted-foreground">Track all admin and user activities.</p>
                  </CardContent>
              </Card>
            </Link>
        </div>
    </div>
  );
}
