"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/exams", label: "Exams" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

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

  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

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
             <Link href="/login">
               <Button variant="ghost">Login</Button>
            </Link>
             <Link href="/signup">
               <Button className="bg-accent hover:bg-accent/90">Sign Up</Button>
            </Link>
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
                  <Link href="/login" passHref onClick={() => setIsSheetOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/signup" passHref onClick={() => setIsSheetOpen(false)}>
                    <Button className="w-full bg-accent hover:bg-accent/90">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
