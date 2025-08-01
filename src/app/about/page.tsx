import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Trophy, Users } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
          About TestPress
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
          Empowering learners and educators through a seamless and robust online examination platform.
        </p>
      </header>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 font-headline">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              Our mission at TestPress is to provide an accessible, reliable, and user-friendly platform for conducting online exams. We aim to bridge the gap between traditional learning and modern technology, making education more effective and engaging for everyone, everywhere.
            </p>
            <p className="text-muted-foreground">
              We believe in the power of assessment to drive learning. By offering detailed feedback and performance analytics, we empower students to identify their strengths and weaknesses, and educators to tailor their teaching methods for better outcomes.
            </p>
          </div>
          <div className="flex justify-center">
            <Image 
              src="https://placehold.co/500x300.png"
              alt="Our Mission"
              width={500}
              height={300}
              data-ai-hint="diverse students"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/50 dark:bg-background rounded-lg">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">Why Choose TestPress?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-4">For Students</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground text-left">
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Take exams from anywhere, anytime.</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Get instant results and detailed feedback.</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Track your performance over time.</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Prepare effectively with a wide range of subjects.</span></li>
                </ul>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                  <Trophy className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-4">For Institutions</CardTitle>
              </CardHeader>
              <CardContent>
                 <ul className="space-y-2 text-muted-foreground text-left">
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Easily create and manage exams.</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Secure and cheat-proof examination environment.</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Automated grading and result processing.</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Upload questions in bulk via CSV.</span></li>
                </ul>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-4">Our Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground text-left">
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Real-time exam timer and auto-submission.</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>AI-powered performance analysis.</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Fully responsive design for all devices.</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Secure authentication and data protection.</span></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
