
import { GraduationCap } from "lucide-react";

interface ScoreCardProps {
    studentName: string;
    examTitle: string;
    subject: string;
    score: number;
}

const getGrade = (score: number): { grade: string; remark: string } => {    
    if (score >= 90) return { grade: "A+", remark: "Excellent" };
    if (score >= 80) return { grade: "A", remark: "Very Good" };
    if (score >= 70) return { grade: "B", remark: "Good" };
    if (score >= 60) return { grade: "C", remark: "Satisfactory" };
    if (score >= 50) return { grade: "D", remark: "Needs Improvement" };
    return { grade: "F", remark: "Fail" };
};

export default function ScoreCard({ studentName, examTitle, subject, score }: ScoreCardProps) {
    const { grade, remark } = getGrade(score);
    const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-8 bg-white border-8 border-blue-200 rounded-lg shadow-2xl font-serif relative">
                <div className="absolute top-8 left-8 right-8 bottom-8 border-2 border-blue-300 rounded-md"></div>
                
                <div className="relative z-10 text-center mb-8">
                    <div className="flex justify-center items-center mb-4">
                        <GraduationCap className="h-16 w-16 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 tracking-wider">TestPress</h1>
                    <p className="text-lg text-gray-500">Official Scorecard</p>
                </div>

                <div className="relative z-10 space-y-6 text-lg">
                    <p>This is to certify that <span className="font-bold text-blue-700">{studentName}</span> has successfully completed the exam.</p>
                    
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-6 bg-blue-50/50 rounded-lg border border-blue-200">
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Exam Title</p>
                            <p className="font-bold">{examTitle}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Subject</p>
                            <p className="font-bold">{subject}</p>
                        </div>
                         <div>
                            <p className="text-sm font-semibold text-gray-500">Score</p>
                            <p className="font-bold">{score}%</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Grade</p>
                            <p className="font-bold">{grade}</p>
                        </div>
                        <div className="col-span-2">
                             <p className="text-sm font-semibold text-gray-500">Remark</p>
                            <p className="font-bold">{remark}</p>
                        </div>
                    </div>

                </div>
                
                <div className="relative z-10 flex justify-between items-end mt-16">
                    <div>
                        <p className="text-sm text-gray-500">Date Issued</p>
                        <p className="font-semibold">{issueDate}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold tracking-wider text-xl" style={{fontFamily: "'Brush Script MT', cursive"}}>J. Doe</p>
                        <hr className="border-gray-600 mt-1"/>
                        <p className="text-sm text-gray-500">Administrator Signature</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
