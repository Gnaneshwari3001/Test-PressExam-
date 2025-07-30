"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { BookOpenCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function FloatingActionButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="fixed bottom-6 right-6 z-50">
            <Link href="/exams" passHref>
                <Button size="icon" className="h-14 w-14 rounded-full bg-accent hover:bg-accent/90 shadow-lg">
                    <BookOpenCheck className="h-6 w-6" />
                    <span className="sr-only">Start Exam</span>
                </Button>
            </Link>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Start an Exam</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
