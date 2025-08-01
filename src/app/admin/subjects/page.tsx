
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookCopy, Cpu, Database, Globe, HardDrive, Network, PenTool, Puzzle, Shield, Waypoints, Download, PlayCircle } from "lucide-react";
import Link from "next/link";

const subjects = [
    { name: "Data Structures", icon: <Waypoints className="h-8 w-8 text-primary" />, examId: "cs-202" },
    { name: "Algorithms", icon: <Puzzle className="h-8 w-8 text-primary" />, examId: "cs-202" },
    { name: "Operating Systems", icon: <HardDrive className="h-8 w-8 text-primary" />, examId: "cs-202" },
    { name: "Computer Networks", icon: <Network className="h-8 w-8 text-primary" />, examId: "cs-202" },
    { name: "DBMS", icon: <Database className="h-8 w-8 text-primary" />, examId: "cs-202" },
    { name: "Software Engineering", icon: <PenTool className="h-8 w-8 text-primary" />, examId: "cs-202" },
    { name: "Object-Oriented Programming", icon: <BookCopy className="h-8 w-8 text-primary" />, examId: "cs-301" },
    { name: "Web Technologies", icon: <Globe className="h-8 w-8 text-primary" />, examId: "cs-301" },
    { name: "Compiler Design", icon: <Cpu className="h-8 w-8 text-primary" />, examId: "cs-301" },
    { name: "Artificial Intelligence", icon: <Cpu className="h-8 w-8 text-primary" />, examId: "cs-301" },
    { name: "Machine Learning", icon: <Cpu className="h-8 w-8 text-primary" />, examId: "cs-301" },
    { name: "Cybersecurity & Cryptography", icon: <Shield className="h-8 w-8 text-primary" />, examId: "cs-301" },
];

const getSubjectContent = (subjectName: string): string => {
    const contentMap: { [key: string]: string } = {
        "Data Structures": `
Data Structures - Key Concepts
1. Arrays: Fixed-size, indexed collections. O(1) access.
2. Linked Lists: Dynamic size, sequential access. Singly vs. Doubly.
3. Stacks: Last-In, First-Out (LIFO). Operations: push, pop, peek.
4. Queues: First-In, First-Out (FIFO). Operations: enqueue, dequeue.
5. Trees: Hierarchical structure. Binary Trees, BSTs, AVL Trees.
6. Graphs: Nodes and edges. Directed vs. Undirected. Traversal: BFS, DFS.
7. Hash Tables: Key-value pairs. O(1) average access. Handle collisions.
`,
        "Algorithms": `
Algorithms - Key Concepts
1. Sorting: Bubble, Selection, Insertion, Merge Sort, QuickSort. Know their time/space complexities.
2. Searching: Linear Search, Binary Search (requires sorted data).
3. Recursion: A function that calls itself. Base case is crucial.
4. Divide and Conquer: Break problem into subproblems (e.g., Merge Sort).
5. Greedy Algorithms: Make locally optimal choices (e.g., Dijkstra's, Kruskal's).
6. Dynamic Programming: Solve overlapping subproblems (e.g., Fibonacci sequence, Knapsack).
7. Big O Notation: Describes the upper bound of an algorithm's complexity.
`,
        "Operating Systems": `
Operating Systems - Key Concepts
1. Processes & Threads: Process is a program in execution. Threads are lightweight processes.
2. Scheduling: CPU scheduling algorithms (FCFS, SJF, Round Robin).
3. Memory Management: Paging, Segmentation, Virtual Memory.
4. Concurrency: Deadlocks, Mutexes, Semaphores.
5. File Systems: FAT, NTFS, ext4. How files are stored and managed.
`,
        "Computer Networks": `
Computer Networks - Key Concepts
1. OSI Model: 7 layers (Physical, Data Link, Network, Transport, Session, Presentation, Application).
2. TCP/IP Model: 4 layers (Link, Internet, Transport, Application).
3. IP Addressing: IPv4 vs. IPv6. Subnetting.
4. Protocols: HTTP, HTTPS, TCP, UDP, FTP, DNS.
5. Routing: How packets are forwarded between networks.
`,
        "DBMS": `
Database Management Systems - Key Concepts
1. Relational Model: Data stored in tables (relations).
2. SQL: Structured Query Language (DDL, DML, DCL, TCL).
3. Normalization: Reducing data redundancy (1NF, 2NF, 3NF, BCNF).
4. ACID Properties: Atomicity, Consistency, Isolation, Durability.
5. Joins: INNER, LEFT, RIGHT, FULL OUTER.
`,
        "Software Engineering": `
Software Engineering - Key Concepts
1. SDLC: Software Development Life Cycle (Waterfall, Agile, Spiral).
2. Agile Methodologies: Scrum, Kanban. Emphasize iterative development.
3. Version Control: Git (commit, push, pull, branch, merge).
4. UML Diagrams: Use Case, Class, Sequence diagrams.
5. Testing: Unit, Integration, System, Acceptance testing.
`,
        "Object-Oriented Programming": `
Object-Oriented Programming (OOP) - Key Concepts
1. Encapsulation: Bundling data and methods. Data hiding.
2. Inheritance: 'is-a' relationship. Reusing code from a superclass.
3. Polymorphism: 'One interface, multiple functions'. Overloading vs. Overriding.
4. Abstraction: Hiding complex implementation details.
5. Classes & Objects: A class is a blueprint; an object is an instance.
`,
        "Web Technologies": `
Web Technologies - Key Concepts
1. Frontend: HTML (structure), CSS (styling), JavaScript (interactivity).
2. Backend: Server-side languages (Node.js, Python, Java).
3. Frameworks: React, Angular, Vue.js (frontend); Express, Django (backend).
4. APIs: RESTful APIs. How client and server communicate.
5. Databases: SQL (PostgreSQL, MySQL) and NoSQL (MongoDB).
`,
        "Compiler Design": `
Compiler Design - Key Concepts
1. Phases of a Compiler: Lexical Analysis, Syntax Analysis, Semantic Analysis, Intermediate Code Generation, Code Optimization, Code Generation.
2. Parsing: Top-down (LL) vs. Bottom-up (LR).
3. Symbol Table: Stores information about identifiers.
4. Three-Address Code: A common form of intermediate code.
5. Lex & Yacc: Tools for building lexical analyzers and parsers.
`,
        "Artificial Intelligence": `
Artificial Intelligence - Key Concepts
1. Search Algorithms: A*, BFS, DFS for state-space search.
2. Machine Learning: Supervised, Unsupervised, Reinforcement learning.
3. Natural Language Processing (NLP): Understanding and generating human language.
4. Neural Networks: The foundation of deep learning.
5. Expert Systems: AI systems that emulate human expert decision-making.
`,
        "Machine Learning": `
Machine Learning - Key Concepts
1. Supervised Learning: Learning from labeled data (e.g., classification, regression).
2. Unsupervised Learning: Finding patterns in unlabeled data (e.g., clustering, dimensionality reduction).
3. Models: Linear Regression, Logistic Regression, Decision Trees, SVMs, Neural Networks.
4. Overfitting & Underfitting: The model is too complex or too simple.
5. Feature Engineering: Creating meaningful input variables for the model.
`,
        "Cybersecurity & Cryptography": `
Cybersecurity & Cryptography - Key Concepts
1. CIA Triad: Confidentiality, Integrity, Availability.
2. Cryptography: Symmetric (AES) vs. Asymmetric (RSA) encryption. Hashing (SHA-256).
3. Network Security: Firewalls, IDS/IPS, VPNs.
4. Common Attacks: Phishing, Malware, DDoS, SQL Injection, Cross-Site Scripting (XSS).
5. Digital Signatures: Ensure authenticity and integrity.
`,
    };
    return contentMap[subjectName] || `No content available for ${subjectName}.`;
};

export default function SubjectsPage() {
  const handleDownload = (subjectName: string) => {
    const content = getSubjectContent(subjectName);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subjectName.toLowerCase().replace(/ /g, '-')}-materials.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Platform Subjects</h1>
        <p className="text-muted-foreground mt-1">An overview of all subjects available for creating exams.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.name} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">{subject.name}</CardTitle>
              {subject.icon}
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-xs text-muted-foreground">Manage exams and questions for this subject.</p>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-2">
                <Button variant="outline" onClick={() => handleDownload(subject.name)}>
                  <Download className="mr-2 h-4 w-4" /> Materials
                </Button>
                <Link href={`/exams/${subject.examId}`} passHref>
                    <Button className="w-full"><PlayCircle className="mr-2 h-4 w-4" /> Take Exam</Button>
                </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
