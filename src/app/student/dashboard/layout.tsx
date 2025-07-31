"use client"

import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { User, Book, BookOpenCheck, CalendarCheck, ClipboardList, GraduationCap, Banknote, FileWarning, FolderKanban, Award, FileText, HelpCircle, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { signOut, onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function StudentDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { toast } = useToast();
    const router = useRouter();
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);

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

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast({
                title: "Logged Out",
                description: "You have been successfully logged out.",
            });
            router.push('/login');
        } catch (error) {
            toast({
                title: "Logout Failed",
                description: "An error occurred while logging out.",
                variant: "destructive"
            });
        }
    };
    
    if (loading) {
        return (
             <div className="flex h-screen">
                <div className="w-64 border-r p-4 hidden md:block">
                    <Skeleton className="h-12 w-full mb-4" />
                    <Skeleton className="h-8 w-full mb-2" />
                    <Skeleton className="h-8 w-full mb-2" />
                    <Skeleton className="h-8 w-full mb-2" />
                    <Skeleton className="h-8 w-full mb-2" />
                </div>
                <div className="flex-1 p-8">
                    <Skeleton className="h-full w-full" />
                </div>
            </div>
        );
    }
    
    if (!user) {
        return null;
    }

    const displayName = user.displayName || user.email?.split('@')[0] || 'User';
    const avatarFallback = displayName.charAt(0).toUpperCase();

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2">
                         <Avatar>
                            <AvatarImage src={user.photoURL || undefined} alt={displayName} />
                            <AvatarFallback>{avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                           <span className="font-semibold text-sm">{displayName}</span>
                           <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="/student/dashboard" tooltip="Profile" isActive={true}><User/>Profile Info</SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="#" tooltip="Subjects"><Book/>Subjects</SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="/exams" tooltip="Exams"><BookOpenCheck/>Exams</SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton href="#" tooltip="Attendance"><CalendarCheck/>Attendance</SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton href="/results" tooltip="Marks"><ClipboardList/>Marks</SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton href="#" tooltip="Grade"><GraduationCap/>Grade</SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton href="#" tooltip="Payments"><Banknote/>Payments</SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton href="#" tooltip="Dues"><FileWarning/>Dues</SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton href="#" tooltip="Materials"><FolderKanban/>Materials</SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton href="#" tooltip="Certificates"><Award/>Certificates</SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton href="#" tooltip="Bonafides"><FileText/>Bonafides</SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton href="#" tooltip="Raise a query"><HelpCircle/>Raise a query</SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
                 <SidebarHeader>
                     <SidebarMenu>
                        <SidebarMenuItem>
                             <SidebarMenuButton onClick={handleLogout} tooltip="Logout"><LogOut/>Logout</SidebarMenuButton>
                        </SidebarMenuItem>
                     </SidebarMenu>
                 </SidebarHeader>
            </Sidebar>

            <SidebarInset>
                <header className="flex justify-between items-center p-4 border-b">
                    <div className="md:hidden">
                       <SidebarTrigger/>
                    </div>
                    <div className="flex-1" />
                    <ThemeToggle />
                </header>
                <div className="p-8">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}