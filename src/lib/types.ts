export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Exam = {
  id: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  questionCount: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  questions: Question[];
};
