import type { Exam } from "@/lib/types";

export const exams: Exam[] = [
  {
    id: "math-101",
    title: "Introduction to Algebra",
    subject: "Mathematics",
    duration: 60,
    questionCount: 5,
    level: "Beginner",
    questions: [
      { id: 1, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
      { id: 2, question: "Solve for x: x - 5 = 10", options: ["10", "15", "5", "-5"], correctAnswer: "15" },
      { id: 3, question: "What is the value of PI (approx)?", options: ["3.14", "2.71", "1.61", "4.0"], correctAnswer: "3.14" },
      { id: 4, question: "What is 12 * 12?", options: ["124", "132", "144", "156"], correctAnswer: "144" },
      { id: 5, question: "What is the square root of 81?", options: ["7", "8", "9", "10"], correctAnswer: "9" },
    ],
  },
  {
    id: "science-101",
    title: "Basics of Physics",
    subject: "Science",
    duration: 45,
    questionCount: 3,
    level: "Beginner",
    questions: [
      { id: 1, question: "What is the formula for force?", options: ["E=mc^2", "F=ma", "a^2+b^2=c^2", "PV=nRT"], correctAnswer: "F=ma" },
      { id: 2, question: "What is the unit of energy?", options: ["Watt", "Newton", "Joule", "Pascal"], correctAnswer: "Joule" },
      { id: 3, question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correctAnswer: "Mars" },
    ],
  },
  {
    id: "history-201",
    title: "World War II",
    subject: "History",
    duration: 75,
    questionCount: 2,
    level: "Intermediate",
    questions: [
      { id: 1, question: "When did World War II start?", options: ["1935", "1939", "1941", "1945"], correctAnswer: "1939" },
      { id: 2, question: "Which event triggered the start of WWII?", options: ["Attack on Pearl Harbor", "Invasion of Poland", "Battle of Stalingrad", "D-Day"], correctAnswer: "Invasion of Poland" },
    ],
  },
  {
    id: "literature-301",
    title: "Shakespearean Tragedies",
    subject: "Literature",
    duration: 90,
    questionCount: 1,
    level: "Advanced",
    questions: [
      { id: 1, question: "Which of these is NOT a tragedy by Shakespeare?", options: ["Hamlet", "Macbeth", "A Midsummer Night's Dream", "Othello"], correctAnswer: "A Midsummer Night's Dream" },
    ],
  },
   {
    id: "geography-101",
    title: "World Capitals",
    subject: "Geography",
    duration: 30,
    questionCount: 2,
    level: "Beginner",
    questions: [
      { id: 1, question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correctAnswer: "Paris" },
      { id: 2, question: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], correctAnswer: "Tokyo" },
    ],
  },
   {
    id: "cs-202",
    title: "Data Structures & Algorithms",
    subject: "Computer Science",
    duration: 120,
    questionCount: 2,
    level: "Advanced",
    questions: [
      { id: 1, question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Array", "Linked List"], correctAnswer: "Stack" },
      { id: 2, question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], correctAnswer: "O(log n)" },
    ],
  },
  {
    id: "aptitude-101",
    title: "Quantitative Aptitude Basics",
    subject: "Aptitude",
    duration: 60,
    questionCount: 3,
    level: "Intermediate",
    questions: [
      { id: 1, question: "A man buys a cycle for $1400 and sells it at a loss of 15%. What is the selling price of the cycle?", options: ["$1190", "$1200", "$1160", "$1000"], correctAnswer: "$1190" },
      { id: 2, question: "The sum of ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?", options: ["4 years", "8 years", "10 years", "None of these"], correctAnswer: "4 years" },
      { id: 3, question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?", options: ["120 metres", "180 metres", "324 metres", "150 metres"], correctAnswer: "150 metres" },
    ],
  },
  {
    id: "reasoning-101",
    title: "Logical Reasoning",
    subject: "Reasoning",
    duration: 45,
    questionCount: 3,
    level: "Intermediate",
    questions: [
      { id: 1, question: "Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?", options: ["7", "10", "12", "13"], correctAnswer: "10" },
      { id: 2, question: "CUP : LIP :: BIRD : ?", options: ["BUSH", "GRASS", "FOREST", "BEAK"], correctAnswer: "BEAK" },
      { id: 3, question: "Which word does NOT belong with the others?", options: ["unimportant", "trivial", "insignificant", "familiar"], correctAnswer: "familiar" },
    ],
  },
  {
    id: "cs-301",
    title: "Object-Oriented Programming",
    subject: "Computer Science",
    duration: 75,
    questionCount: 2,
    level: "Advanced",
    questions: [
      { id: 1, question: "Which of the following is not an OOPS concept?", options: ["Encapsulation", "Polymorphism", "Inheritance", "Compilation"], correctAnswer: "Compilation" },
      { id: 2, question: "Which concept allows you to define a new class from an existing class?", options: ["Encapsulation", "Inheritance", "Abstraction", "Polymorphism"], correctAnswer: "Inheritance" },
    ],
  },
];

export const getExamById = (id: string): Exam | undefined => {
  return exams.find((exam) => exam.id === id);
};
