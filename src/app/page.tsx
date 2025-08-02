
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenCheck, GraduationCap, Users, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { exams } from "@/lib/data";
import ExamCard from "@/components/exam-card";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const featuredExams = exams.slice(0, 3);
  const router = useRouter();

  const handleStartExamClick = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/exams");
      } else {
        router.push("/login");
      }
    });
  };


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/10 dark:bg-primary/5 animate-fade-in-down">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Test Your Knowledge – Take Exams Online
                </h1>
                <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                  Welcome to TestPress, your premier destination for online examinations. Sharpen your skills, prepare for success, and achieve your goals.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={handleStartExamClick}>Start Exam</Button>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline">Go to Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 animate-fade-in-up">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <BookOpenCheck className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold">150+</h3>
                <p className="text-muted-foreground">Total Exams</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold">10,000+</h3>
                <p className="text-muted-foreground">Students Enrolled</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <GraduationCap className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold">95%</h3>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50 dark:bg-background animate-fade-in-up animation-delay-200">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 font-headline">
              Featured Exams
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/exams">
                <Button size="lg" variant="link">View All Exams →</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 animate-fade-in-up animation-delay-400">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">What Our Students Say</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from students who have used TestPress to achieve their academic goals.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div>
                      <CardTitle>Sarah L.</CardTitle>
                      <div className="flex text-yellow-400">
                        <Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>"TestPress has been a game-changer for my exam preparations. The variety of exams and instant feedback are incredible."</p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                   <div className="flex items-center gap-4">
                    <div>
                      <CardTitle>Mike P.</CardTitle>
                      <div className="flex text-yellow-400">
                        <Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>"The user interface is so clean and intuitive. Taking exams has never been this stress-free. The performance analytics are a huge plus!"</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                   <div className="flex items-center gap-4">
                    <div>
                      <CardTitle>Jessica T.</CardTitle>
                      <div className="flex text-yellow-400">
                        <Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>"The admin panel is powerful yet easy to use. Setting up new exams and managing students is a breeze."</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
