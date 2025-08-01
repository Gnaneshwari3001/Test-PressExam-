
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderKanban, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const materials = [
    { id: 1, subject: "Data Structures", fileName: "data-structures-notes.pdf", uploader: "Dr. Alan Grant", date: "2023-10-20" },
    { id: 2, subject: "Algorithms", fileName: "algorithm-cheatsheet.pdf", uploader: "Dr. Ellie Sattler", date: "2023-10-22" },
    { id: 3, subject: "Operating Systems", fileName: "os-concepts.pdf", uploader: "Dr. Ian Malcolm", date: "2023-10-25" },
    { id: 4, subject: "Data Structures", fileName: "advanced-trees.pdf", uploader: "Dr. Alan Grant", date: "2023-10-28" },
    { id: 5, subject: "Computer Networks", fileName: "osi-model-guide.pdf", uploader: "Dr. Sarah Harding", date: "2023-11-01" },
];

const getSubjectContent = (subjectName: string): string => {
    // This is mock content. In a real application, this would fetch from a database or API.
    const contentMap: { [key: string]: string } = {
        "Data Structures": "This document contains comprehensive notes on Data Structures, including arrays, linked lists, stacks, queues, trees, and graphs.",
        "Algorithms": "This is a cheatsheet for common algorithms, covering sorting (Bubble, Merge, Quick), searching (Linear, Binary), and graph traversal (BFS, DFS).",
        "Operating Systems": "This document covers core OS concepts like process management, memory management, file systems, and concurrency.",
        "Computer Networks": "A guide to the OSI model, TCP/IP, and common networking protocols.",
    };
    return contentMap[subjectName] || `No content available for ${subjectName}.`;
};


export default function MaterialsPage() {
    const { toast } = useToast();

    const handleDownload = (subject: string, fileName: string) => {
        const content = getSubjectContent(subject);
        if (content.startsWith("No content")) {
            toast({
                title: "Download Failed",
                description: "No downloadable material found for this subject.",
                variant: "destructive",
            });
            return;
        }

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        // The filename is changed to .txt as the content is plain text.
        a.download = fileName.replace('.pdf', '.txt');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast({
            title: "Download Started",
            description: `Your download for "${fileName.replace('.pdf', '.txt')}" has started.`,
        });
    }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Study Materials</h1>
        <p className="text-muted-foreground mt-1">Download course materials and resources uploaded by your instructors.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FolderKanban /> Available Materials</CardTitle>
          <CardDescription>Click the download button to get the files.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {materials.map((material) => (
                <Card key={material.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <FileText className="h-8 w-8 text-primary shrink-0"/>
                        <div>
                            <p className="font-semibold">{material.fileName}</p>
                            <p className="text-xs text-muted-foreground">
                                Subject: {material.subject} | Uploaded by: {material.uploader} on {material.date}
                            </p>
                        </div>
                    </div>
                     <Button variant="outline" onClick={() => handleDownload(material.subject, material.fileName)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
