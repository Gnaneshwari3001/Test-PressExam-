
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { auth, database } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ref, get } from "firebase/database";
import { Skeleton } from "./ui/skeleton";

type UserRole = 'student' | 'instructor' | 'admin';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = ref(database, 'users/' + currentUser.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            setRole(snapshot.val().role);
            setUser(currentUser);
        } else {
            setUser(null);
            setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "An error occurred while logging out.",
        variant: "destructive"
      });
    }
    setIsSheetOpen(false);
  };


  const NavLinks = ({ className, onLinkClick }: { className?: string, onLinkClick?: () => void }) => (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onLinkClick}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === href ? "text-primary" : "text-muted-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );

  const getAvatarFallback = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  }

  const renderAuthButtons = () => {
    if (loading) {
      return <Skeleton className="h-8 w-24" />;
    }

    if (user && role) {
      return (
        <>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || 'User'} />
                <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
            </Avatar>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </>
      );
    }

    return (
      <>
        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>
        <Link href="/signup">
          <Button className="bg-accent hover:bg-accent/90">Sign Up</Button>
        </Link>
      </>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">TestPress</span>
        </Link>
        <div className="hidden md:flex flex-1">
          <NavLinks />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
           <div className="hidden md:flex items-center space-x-2">
             {renderAuthButtons()}
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4">
                <NavLinks className="flex-col items-start space-x-0 space-y-2" onLinkClick={() => setIsSheetOpen(false)} />
                <div className="flex flex-col space-y-2 pt-4">
                  {user && role ? (
                      <Button variant="outline" onClick={handleLogout} className="w-full">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </Button>
                  ) : (
                    <>
                      <Link href="/login" passHref onClick={() => setIsSheetOpen(false)}>
                        <Button variant="outline" className="w-full">Login</Button>
                      </Link>
                      <Link href="/signup" passHref onClick={() => setIsSheetOpen(false)}>
                        <Button className="w-full bg-accent hover:bg-accent/90">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
