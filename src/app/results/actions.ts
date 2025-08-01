"use server";

import { analyzeExamResults, AnalyzeExamResultsInput } from "@/ai/flows/analyze-exam-results";
import { getExamById } from "@/lib/data";

export async function getAnalysis(examId: string, userAnswers: { [key: number]: string }, studentName: string) {
  try {
    const exam = getExamById(examId);

    if (!exam) {
      throw new Error("Exam not found");
    }

    const results = exam.questions.map(question => ({
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
    
    return {
      success: true,
      analysis,
      userAnswers,
      exam
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
