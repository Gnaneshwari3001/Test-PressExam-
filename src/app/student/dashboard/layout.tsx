
"use client"

import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { User, Book, BookOpenCheck, CalendarCheck, ClipboardList, GraduationCap, Banknote, FileWarning, FolderKanban, Award, FileText, HelpCircle, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { signOut, onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
    const pathname = usePathname();
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

    const menuItems = [
        { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard, tooltip: "Dashboard" },
        { href: "/student/profile", label: "Profile Info", icon: User, tooltip: "Profile Info" },
        { href: "/student/subjects", label: "Subjects", icon: Book, tooltip: "Subjects" },
        { href: "/exams", label: "Exams", icon: BookOpenCheck, tooltip: "Exams" },
        { href: "/student/attendance", label: "Attendance", icon: CalendarCheck, tooltip: "Attendance" },
        { href: "/results", label: "Marks", icon: ClipboardList, tooltip: "Marks" },
        { href: "/student/grade", label: "Grade", icon: GraduationCap, tooltip: "Grade" },
        { href: "/student/payments", label: "Payments", icon: Banknote, tooltip: "Payments" },
        { href: "/student/dues", label: "Dues", icon: FileWarning, tooltip: "Dues" },
        { href: "/student/materials", label: "Materials", icon: FolderKanban, tooltip: "Materials" },
        { href: "/student/certificates", label: "Certificates", icon: Award, tooltip: "Certificates" },
        { href: "/student/bonafides", label: "Bonafides", icon: FileText, tooltip: "Bonafides" },
        { href: "/student/query", label: "Raise a query", icon: HelpCircle, tooltip: "Raise a query" },
    ];

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
                         {menuItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <Link href={item.href} passHref>
                                    <SidebarMenuButton 
                                        asChild={false}
                                        tooltip={item.tooltip} 
                                        isActive={pathname === item.href}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
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
