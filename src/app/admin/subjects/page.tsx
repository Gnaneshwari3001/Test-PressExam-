
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookCopy, Cpu, Database, Globe, HardDrive, Network, PenTool, Puzzle, Shield, Waypoints, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";


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
Data Structures - Detailed Study Guide

Topic 1: Introduction to Data Structures
- Definition: A data structure is a specialized format for organizing, processing, retrieving, and storing data.
- Importance: Efficient data management, foundation for complex algorithms.
- Types: Linear (Arrays, Linked Lists, Stacks, Queues) and Non-Linear (Trees, Graphs).

Topic 2: Arrays
- Concept: A collection of items stored at contiguous memory locations.
- Characteristics: Fixed size, O(1) random access by index.
- Operations: Traversal (O(n)), Insertion (O(n)), Deletion (O(n)), Search (O(n) for unsorted, O(log n) for sorted).

Topic 3: Linked Lists
- Concept: A linear data structure where elements are not stored at contiguous memory locations. Elements are linked using pointers.
- Types:
  - Singly Linked List: Each node points to the next node.
  - Doubly Linked List: Each node points to the next and previous nodes.
  - Circular Linked List: The last node points back to the first node.
- Operations: Insertion/Deletion at beginning (O(1)), at end (O(n) for singly, O(1) with tail pointer), in middle (O(n)).

Topic 4: Stacks
- Concept: Follows the Last-In, First-Out (LIFO) principle.
- Analogy: A stack of plates.
- Operations:
  - push: Add an item to the top. (O(1))
  - pop: Remove an item from the top. (O(1))
  - peek/top: View the top item without removing it. (O(1))
- Applications: Function calls (call stack), undo/redo functionality, expression evaluation.

Topic 5: Queues
- Concept: Follows the First-In, First-Out (FIFO) principle.
- Analogy: A checkout line.
- Operations:
  - enqueue: Add an item to the rear. (O(1))
  - dequeue: Remove an item from the front. (O(1))
- Applications: Task scheduling, print job queuing, breadth-first search.

Topic 6: Trees
- Concept: A hierarchical data structure with a root value and subtrees of children with a parent node.
- Key Types:
  - Binary Tree: Each node has at most two children.
  - Binary Search Tree (BST): Left child is smaller, right child is larger. Provides O(log n) average search/insert/delete.
  - AVL Tree / Red-Black Tree: Self-balancing BSTs to guarantee O(log n) worst-case performance.
- Traversal Methods: In-order, Pre-order, Post-order.

Topic 7: Graphs
- Concept: A set of nodes (vertices) connected by edges. Can be directed or undirected.
- Representation: Adjacency Matrix, Adjacency List.
- Traversal Algorithms:
  - Breadth-First Search (BFS): Explores neighbor nodes first. Uses a queue.
  - Depth-First Search (DFS): Explores as far as possible along each branch before backtracking. Uses a stack.

Topic 8: Hash Tables
- Concept: A data structure that maps keys to values using a hash function.
- Goal: Provides O(1) average time complexity for insertion, deletion, and search.
- Collision Handling:
  - Chaining: Each bucket stores a linked list of elements that hash to the same index.
  - Open Addressing: Find the next open slot in the table (e.g., linear probing).
`,
        "Algorithms": `
Algorithms - Detailed Study Guide

Topic 1: Introduction to Algorithms
- Definition: A step-by-step procedure for solving a problem or accomplishing a task.
- Key Properties: Correctness, Efficiency, Finiteness.
- Algorithm Analysis: Analyzing time complexity (how long it takes) and space complexity (how much memory it uses).

Topic 2: Big O Notation
- Concept: Describes the limiting behavior of a function when the argument tends towards a particular value or infinity. It characterizes performance as the input size grows.
- Common Complexities:
  - O(1): Constant time (e.g., accessing an array element).
  - O(log n): Logarithmic time (e.g., binary search).
  - O(n): Linear time (e.g., iterating through a list).
  - O(n log n): Log-linear time (e.g., efficient sorting algorithms).
  - O(n^2): Quadratic time (e.g., simple sorting algorithms).
  - O(2^n): Exponential time (e.g., recursive Fibonacci).

Topic 3: Sorting Algorithms
- Bubble Sort: Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. (O(n^2))
- Selection Sort: Repeatedly finds the minimum element from the unsorted part and puts it at the beginning. (O(n^2))
- Insertion Sort: Builds the final sorted array one item at a time. Efficient for small or nearly sorted datasets. (O(n^2))
- Merge Sort: A divide-and-conquer algorithm. Divides the array into halves, sorts them, and then merges them. Stable and efficient. (O(n log n))
- QuickSort: Another divide-and-conquer algorithm. Picks a 'pivot' element and partitions the other elements into two sub-arrays. (O(n log n) average, O(n^2) worst-case).

Topic 4: Searching Algorithms
- Linear Search: Sequentially checks each element of the list until a match is found or the whole list has been searched. (O(n))
- Binary Search: Efficiently finds an item in a **sorted** array by repeatedly dividing the search interval in half. (O(log n))

Topic 5: Algorithm Design Paradigms
- Divide and Conquer: Break the problem into smaller subproblems of the same type, solve them recursively, and combine the solutions. (e.g., Merge Sort, QuickSort).
- Greedy Algorithms: At each step, make the choice that seems best at the moment (the locally optimal choice) in the hope that this will lead to a globally optimal solution. (e.g., Dijkstra's, Kruskal's, Prim's).
- Dynamic Programming: Solve complex problems by breaking them down into simpler, overlapping subproblems. It stores the results of subproblems to avoid re-computation. (e.g., Fibonacci sequence, Knapsack problem).
- Backtracking: A general algorithm for finding all (or some) solutions to some computational problems, that incrementally builds candidates to the solutions.

Topic 6: Graph Algorithms
- Shortest Path (Single Source):
  - Dijkstra's Algorithm: For graphs with non-negative edge weights.
  - Bellman-Ford Algorithm: For graphs with negative edge weights.
- Minimum Spanning Tree (MST): A subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.
  - Kruskal's Algorithm: A greedy algorithm that adds edges in increasing order of weight.
  - Prim's Algorithm: A greedy algorithm that grows the MST from a single vertex.
`,
        "Operating Systems": `
Operating Systems - Detailed Study Guide

Topic 1: Introduction
- Definition: Software that manages computer hardware and software resources and provides common services for computer programs.
- Core Functions: Process Management, Memory Management, File System Management, I/O Device Management, Security.

Topic 2: Processes and Threads
- Process: A program in execution. It has its own address space.
- Thread: A lightweight process. A basic unit of CPU utilization. Threads of the same process share the same address space.
- Process State: New, Ready, Running, Waiting, Terminated.

Topic 3: CPU Scheduling
- Goal: To maximize CPU utilization and throughput.
- Scheduling Algorithms:
  - First-Come, First-Served (FCFS): Non-preemptive. Simple but can lead to long waiting times.
  - Shortest-Job-First (SJF): Can be preemptive or non-preemptive. Optimal in terms of average waiting time, but hard to predict the length of the next CPU burst.
  - Round Robin (RR): Preemptive. Each process gets a small unit of CPU time (time quantum). Good for time-sharing systems.
  - Priority Scheduling: Assigns a priority to each process.

Topic 4: Memory Management
- Concept: Managing the computer's primary memory (RAM).
- Techniques:
  - Paging: Memory is divided into fixed-size blocks called pages. Allows a process's physical address space to be non-contiguous.
  - Segmentation: Memory is divided into variable-sized blocks called segments based on logical divisions (e.g., code, data, stack).
  - Virtual Memory: A technique that allows the execution of processes that are not completely in memory. Enables a larger logical address space than the physical address space.

Topic 5: Concurrency and Synchronization
- Race Condition: A situation where the result of a computation depends on the sequence or timing of uncontrollable events.
- Critical Section: A piece of code that accesses a shared resource.
- Synchronization Primitives:
  - Mutex (Mutual Exclusion): A lock that ensures only one thread can access a resource at a time.
  - Semaphore: A signaling mechanism that can be used to control access to a shared resource by multiple processes.
- Deadlock: A situation where two or more processes are blocked forever, waiting for each other. Conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.

Topic 6: File Systems
- Concept: How data is stored and retrieved on a storage device.
- File: A collection of related information.
- Directory: A structure that holds references to files and other directories.
- Common File Systems: FAT32, NTFS (Windows), ext4 (Linux), APFS (macOS).
`,
        "Computer Networks": `
Computer Networks - Detailed Study Guide

Topic 1: Introduction to Networks
- Definition: A collection of computers and devices interconnected by communication channels that facilitate communications among users and allows users to share resources.
- Types: LAN (Local Area Network), WAN (Wide Area Network), MAN (Metropolitan Area Network).

Topic 2: Network Models
- OSI Model (Open Systems Interconnection): A conceptual framework with 7 layers.
  1. Physical: Transmission of raw bits.
  2. Data Link: Node-to-node data transfer (MAC addresses).
  3. Network: Logical addressing and routing (IP addresses).
  4. Transport: End-to-end communication, reliability, flow control (TCP, UDP).
  5. Session: Manages sessions between applications.
  6. Presentation: Data translation, encryption, compression.
  7. Application: Network services to applications (HTTP, FTP, SMTP).
- TCP/IP Model: A more practical, 4-layer model.
  1. Link Layer (Network Interface)
  2. Internet Layer (IP)
  3. Transport Layer (TCP, UDP)
  4. Application Layer

Topic 3: IP Addressing
- IPv4: A 32-bit address, written as four octets in decimal (e.g., 192.168.1.1).
- IPv6: A 128-bit address, designed to replace IPv4.
- Subnetting: Dividing a single large network into smaller logical networks (subnets).

Topic 4: Transport Layer Protocols
- TCP (Transmission Control Protocol): Connection-oriented, reliable, ordered data delivery. Uses a three-way handshake to establish a connection.
- UDP (User Datagram Protocol): Connectionless, unreliable, "best-effort" delivery. Faster but does not guarantee delivery. Used for real-time applications like streaming or gaming.

Topic 5: Application Layer Protocols
- HTTP (HyperText Transfer Protocol): The foundation of data communication for the World Wide Web.
- HTTPS: Secure version of HTTP, encrypted using SSL/TLS.
- DNS (Domain Name System): Translates human-readable domain names (e.g., www.google.com) to machine-readable IP addresses.
- FTP (File Transfer Protocol): Used to transfer files between a client and a server.
- SMTP (Simple Mail Transfer Protocol): Used for sending email.

Topic 6: Routing
- Concept: The process of selecting a path for traffic in a network, or between or across multiple networks.
- Routing Protocols: OSPF, BGP.
`,
        "DBMS": `
Database Management Systems (DBMS) - Detailed Study Guide

Topic 1: Introduction
- Definition: Software for creating and managing databases.
- Purpose: Provides a systematic way to create, retrieve, update, and manage data.
- Relational Model: Data is organized into tables (relations) of rows and columns.

Topic 2: SQL (Structured Query Language)
- Definition: The standard language for dealing with Relational Databases.
- Sublanguages:
  - DDL (Data Definition Language): Defines the database schema (e.g., CREATE TABLE, ALTER TABLE, DROP TABLE).
  - DML (Data Manipulation Language): Used for adding, deleting, and modifying data (e.g., INSERT, UPDATE, DELETE).
  - DQL (Data Query Language): Used for performing queries on the data (e.g., SELECT).
  - DCL (Data Control Language): Deals with rights, permissions, and other controls (e.g., GRANT, REVOKE).

Topic 3: Normalization
- Goal: To reduce data redundancy and improve data integrity.
- Normal Forms:
  - 1NF (First Normal Form): Ensures that table columns hold atomic values and each row is unique.
  - 2NF (Second Normal Form): Must be in 1NF. All non-key attributes must be fully functional dependent on the primary key.
  - 3NF (Third Normal Form): Must be in 2NF. All attributes must be dependent only on the primary key, not on other non-key attributes (no transitive dependency).
  - BCNF (Boyce-Codd Normal Form): A stricter version of 3NF.

Topic 4: ACID Properties
- Concept: A set of properties of database transactions intended to guarantee validity even in the event of errors, power failures, etc.
- Properties:
  - Atomicity: Transactions are all-or-nothing.
  - Consistency: Any transaction will bring the database from one valid state to another.
  - Isolation: Concurrent execution of transactions results in a system state that would be obtained if transactions were executed serially.
  - Durability: Once a transaction has been committed, it will remain so, even in the event of power loss.

Topic 5: Joins
- Purpose: To combine rows from two or more tables based on a related column between them.
- Types:
  - INNER JOIN: Returns records that have matching values in both tables.
  - LEFT (OUTER) JOIN: Returns all records from the left table, and the matched records from the right table.
  - RIGHT (OUTER) JOIN: Returns all records from the right table, and the matched records from the left table.
  - FULL (OUTER) JOIN: Returns all records when there is a match in either left or right table.
`,
        "Software Engineering": `
Software Engineering - Detailed Study Guide

Topic 1: Introduction
- Definition: The application of a systematic, disciplined, quantifiable approach to the development, operation, and maintenance of software.
- Goal: To produce high-quality software that is delivered on time and within budget.

Topic 2: Software Development Life Cycle (SDLC)
- Definition: A process followed for a software project.
- Models:
  - Waterfall: A linear, sequential approach. Each phase must be completed before the next begins. Rigid and lacks flexibility.
  - Agile: An iterative and incremental approach. Emphasizes collaboration, customer feedback, and small, rapid releases.
  - Spiral: Combines elements of both design and prototyping-in-stages, in an effort to combine advantages of top-down and bottom-up concepts.
  - V-Model: An extension of the waterfall model where testing is planned in parallel with development.

Topic 3: Agile Methodologies
- Scrum: An Agile framework for managing complex projects. It consists of Sprints (fixed-length iterations), with roles like Product Owner, Scrum Master, and Development Team. Artifacts include Product Backlog, Sprint Backlog.
- Kanban: An Agile framework focused on visualizing work, limiting work in progress, and maximizing flow. Uses a Kanban board to track tasks.

Topic 4: Version Control Systems
- Definition: A system that records changes to a file or set of files over time so that you can recall specific versions later.
- Git: The most widely used modern distributed version control system.
- Key Git Commands: 'commit' (save changes), 'push' (upload to remote), 'pull' (download from remote), 'branch' (create a new line of development), 'merge' (join branches).

Topic 5: UML (Unified Modeling Language)
- Definition: A standardized modeling language used to visualize, specify, construct, and document the artifacts of a software system.
- Common Diagrams:
  - Use Case Diagram: Describes how a user interacts with the system.
  - Class Diagram: Shows the structure of the system's classes, their attributes, methods, and relationships.
  - Sequence Diagram: Shows how objects interact with each other in a particular scenario, arranged in a time sequence.

Topic 6: Software Testing
- Goal: To find defects and verify that the software meets requirements.
- Levels of Testing:
  - Unit Testing: Testing individual components or modules.
  - Integration Testing: Testing the interaction between integrated components.
  - System Testing: Testing the complete and integrated software system.
  - Acceptance Testing: Testing to determine if the system satisfies the acceptance criteria, often by the client.
`,
    };
    return contentMap[subjectName] || `No content available for ${subjectName}.`;
};

export default function SubjectsPage() {

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
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <FileText className="mr-2 h-4 w-4" /> View Curriculum
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>{subject.name} - Curriculum</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-96 w-full">
                           <div className="prose dark:prose-invert whitespace-pre-wrap p-4">
                                {getSubjectContent(subject.name)}
                           </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
