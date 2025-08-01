
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award, Download, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import CertificateCard from "@/components/certificate-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";


interface Certificate {
    id: string;
    courseName: string;
    completionDate: string;
}

const earnedCertificates: Certificate[] = [
    { id: "cert_1", courseName: "Basics of Physics", completionDate: "2023-10-24" },
    { id: "cert_2", courseName: "World Capitals", completionDate: "2023-10-20" },
    { id: "cert_3", courseName: "Data Structures & Algorithms", completionDate: "2023-10-18" },
];


export default function CertificatesPage() {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
    const [showBackButton, setShowBackButton] = useState(false);
    const router = useRouter();
    
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

    useEffect(() => {
        if (selectedCertificate) {
            const handleAfterPrint = () => {
                setShowBackButton(true);
                window.removeEventListener('afterprint', handleAfterPrint);
            };
            window.addEventListener('afterprint', handleAfterPrint);
            window.print();
        }
    }, [selectedCertificate]);

    const handleDownload = (certificate: Certificate) => {
        setShowBackButton(false);
        setSelectedCertificate(certificate);
    };
    
    const handleGoBack = () => {
        setSelectedCertificate(null);
        setShowBackButton(false);
    }

    if (loading) {
        return (
            <div>
                 <Skeleton className="h-8 w-1/4 mb-4" />
                 <Skeleton className="h-4 w-1/2 mb-8" />
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </CardContent>
                 </Card>
            </div>
        )
    }
    
    if (selectedCertificate && user) {
        return (
            <div>
                 {showBackButton && (
                    <div className="no-print mb-4 flex justify-end">
                        <Button onClick={handleGoBack}>
                            <ChevronLeft className="mr-2 h-4 w-4"/> Back to Certificates
                        </Button>
                    </div>
                )}
                 <CertificateCard
                    studentName={user.displayName ?? "Student"}
                    courseName={selectedCertificate.courseName}
                    completionDate={new Date(selectedCertificate.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  />
             </div>
        )
    }

  return (
    <div className="no-print">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">My Certificates</h1>
        <p className="text-muted-foreground mt-1">Download your earned certificates for successfully completed courses.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Award /> Earned Certificates</CardTitle>
          <CardDescription>A list of all the certificates you have earned.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {earnedCertificates.map((cert) => (
                <Card key={cert.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
                     <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <Award className="h-8 w-8 text-primary shrink-0"/>
                        <div>
                            <p className="font-semibold">{cert.courseName}</p>
                            <p className="text-xs text-muted-foreground">
                                Completed on: {new Date(cert.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={() => handleDownload(cert)}>
                        <Download className="mr-2 h-4 w-4"/>
                        Download Certificate
                    </Button>
                </Card>
            ))}
            {earnedCertificates.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p>You have not earned any certificates yet.</p>
                    <p>Keep taking exams to earn them!</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
