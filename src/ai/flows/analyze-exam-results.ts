// This is an AI-powered function to analyze exam results and provide personalized feedback.
// It takes exam results as input and returns an analysis of areas for improvement.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExamResultSchema = z.object({
  question: z.string().describe('The question asked in the exam.'),
  answer: z.string().describe('The answer provided by the student.'),
  isCorrect: z.boolean().describe('Whether the answer is correct or not.'),
});

const AnalyzeExamResultsInputSchema = z.object({
  examName: z.string().describe('The name of the exam.'),
  studentName: z.string().describe('The name of the student.'),
  results: z.array(ExamResultSchema).describe('The results of the exam.'),
});

export type AnalyzeExamResultsInput = z.infer<typeof AnalyzeExamResultsInputSchema>;

const AnalyzeExamResultsOutputSchema = z.object({
  totalQuestions: z.number().describe('The total number of questions in the exam.'),
  correctAnswers: z.number().describe('The total number of correct answers.'),
  areasForImprovement: z
    .array(z.string())
    .describe('The areas where the student needs to improve.'),
  detailedFeedback: z.string().describe('Detailed feedback on the student performance.'),
});

export type AnalyzeExamResultsOutput = z.infer<typeof AnalyzeExamResultsOutputSchema>;

export async function analyzeExamResults(input: AnalyzeExamResultsInput): Promise<AnalyzeExamResultsOutput> {
  return analyzeExamResultsFlow(input);
}

const analyzeExamResultsPrompt = ai.definePrompt({
  name: 'analyzeExamResultsPrompt',
  input: {
    schema: AnalyzeExamResultsInputSchema,
  },
  output: {
    schema: AnalyzeExamResultsOutputSchema,
  },
  prompt: `You are an AI-powered educational assistant. Your task is to analyze exam results and provide personalized feedback to students.

  Analyze the exam results for {{studentName}} on the exam "{{examName}}".
  
  First, calculate the total number of questions and the total number of correct answers. A correct answer is worth 1 mark, and an incorrect answer is worth 0 marks. Do not calculate a percentage.

  Exam Results:
  {{#each results}}
  Question: {{this.question}}
  Answer: {{this.answer}}
  Correct: {{this.isCorrect}}
  {{/each}}

  Based on the results, identify areas where the student needs to improve and provide detailed, encouraging feedback to help them enhance their learning outcomes.
  The response must be in JSON format. The JSON should have the following schema:
  ${JSON.stringify(AnalyzeExamResultsOutputSchema.describe)}
  `,
});

const analyzeExamResultsFlow = ai.defineFlow(
  {
    name: 'analyzeExamResultsFlow',
    inputSchema: AnalyzeExamResultsInputSchema,
    outputSchema: AnalyzeExamResultsOutputSchema,
  },
  async input => {
    const {output} = await analyzeExamResultsPrompt(input);
    return output!;
  }
);
