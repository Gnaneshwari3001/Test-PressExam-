

"use client"

import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { User, Book, BookOpenCheck, Users, BarChart2, Bell, LogOut, LayoutDashboard, ShieldCheck, UploadCloud, History, FileBadge } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { signOut, onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth, database } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { get, ref } from "firebase/database";

type UserRole = 'student' | 'instructor' | 'admin';

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { toast } = useToast();
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [role, setRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userRef = ref(database, 'users/' + currentUser.uid);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    if (userData.role === 'instructor' || userData.role === 'admin') {
                        setUser(currentUser);
                        setRole(userData.role);
                    } else {
                        // If a student tries to access, redirect them
                        router.push('/student/dashboard');
                    }
                } else {
                    router.push('/login');
                }
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
    
    if (!user || !role) {
        return null;
    }

    const displayName = user.displayName || user.email?.split('@')[0] || 'User';
    const avatarFallback = displayName.charAt(0).toUpperCase();

    const adminMenuItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard, tooltip: "Dashboard" },
        { href: "/admin/exams", label: "Exam Oversight", icon: BookOpenCheck, tooltip: "Exam Oversight" },
        { href: "/admin/requests", label: "Certificate Requests", icon: FileBadge, tooltip: "Certificate Requests" },
        { href: "/admin/students", label: "User Management", icon: Users, tooltip: "User Management" },
        { href: "/admin/materials/log", label: "Materials Log", icon: History, tooltip: "Materials Log" },
        { href: "/admin/analytics", label: "Analytics", icon: BarChart2, tooltip: "Analytics" },
        { href: "/admin/notifications", label: "Announcements", icon: Bell, tooltip: "Announcements" },
        { href: "/admin/profile", label: "Admin Profile", icon: ShieldCheck, tooltip: "Admin Profile" },
    ];
    
    const instructorMenuItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard, tooltip: "Dashboard" },
        { href: "/admin/exams", label: "Manage Exams", icon: BookOpenCheck, tooltip: "Manage Exams" },
        { href: "/admin/requests", label: "Certificate Requests", icon: FileBadge, tooltip: "Certificate Requests" },
        { href: "/admin/materials/upload", label: "Upload Materials", icon: UploadCloud, tooltip: "Upload Materials" },
        { href: "/admin/subjects", label: "Subjects", icon: Book, tooltip: "Subjects" },
        { href: "/admin/students", label: "My Students", icon: Users, tooltip: "My Students" },
        { href: "/admin/analytics", label: "Analytics", icon: BarChart2, tooltip: "Analytics" },
        { href: "/admin/notifications", label: "Notifications", icon: Bell, tooltip: "Notifications" },
        { href: "/admin/profile", label: "My Profile", icon: User, tooltip: "My Profile" },
    ]

    const menuItems = role === 'admin' ? adminMenuItems : instructorMenuItems;
    const layoutTitle = role === 'admin' ? 'Admin Panel' : 'Instructor Panel';

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
                           <span className="text-xs text-muted-foreground capitalize">{role}</span>
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
                     <h2 className="font-bold text-lg hidden md:block">{layoutTitle}</h2>
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
