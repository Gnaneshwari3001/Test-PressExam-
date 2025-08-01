"use server";

import { analyzeExamResults, AnalyzeExamResultsInput } from "@/ai/flows/analyze-exam-results";
import { getExamById } from "@/lib/data";
import type { Question } from "@/lib/types";

export async function getAnalysis(examId: string, userAnswers: { [key: number]: string }, studentName: string, shuffledQuestions: Question[]) {
  try {
    const exam = getExamById(examId);

    if (!exam) {
      throw new Error("Exam not found");
    }

    // Use the shuffled questions that were actually presented to the student
    const questionsToAnalyze = shuffledQuestions.length > 0 ? shuffledQuestions : exam.questions;

    const results = questionsToAnalyze.map(question => ({
      question: question.question,
      answer: userAnswers[question.id] || "No answer",
      isCorrect: (userAnswers[question.id] || "No answer") === question.correctAnswer,
    }));

    const analysisInput: AnalyzeExamResultsInput = {
      examName: exam.title,
      studentName: studentName,
      results: results,
    };
    
    const analysis = await analyzeExamResults(analysisInput);
    
    // Replace the original exam questions with the shuffled ones for review
    const examForReview = { ...exam, questions: questionsToAnalyze };
    
    return {
      success: true,
      analysis,
      userAnswers,
      exam: examForReview
    };

  } catch (error) {
    console.error("Error analyzing exam results:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { 
        success: false, 
        error: "Failed to analyze results. " + errorMessage 
    };
  }
}
