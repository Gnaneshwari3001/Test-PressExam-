
import { Medal, FileText } from "lucide-react";

interface CertificateCardProps {
    studentName: string;
    courseName: string;
    completionDate: string;
    isBonafide?: boolean;
}

export default function CertificateCard({ studentName, courseName, completionDate, isBonafide = false }: CertificateCardProps) {
    const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const title = isBonafide ? "Bonafide Certificate" : "Certificate of Achievement";
    const description = isBonafide ? "This is to certify that the following information is true to the best of our knowledge." : "This certificate is proudly presented to";

    return (
        <div className="flex items-center justify-center min-h-screen bg-white text-gray-800">
            <div className="w-full max-w-4xl p-8 bg-white border-8 border-yellow-300 rounded-lg shadow-2xl font-serif relative">
                <div className="absolute top-8 left-8 right-8 bottom-8 border-2 border-yellow-400 rounded-md"></div>
                
                <div className="relative z-10 text-center mb-8">
                    <div className="flex justify-center items-center mb-4">
                        {isBonafide ? <FileText className="h-16 w-16 text-yellow-500" /> : <Medal className="h-16 w-16 text-yellow-500" />}
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 tracking-wider">TestPress</h1>
                    <p className="text-lg text-gray-500">{title}</p>
                </div>

                <div className="relative z-10 space-y-6 text-lg text-center">
                    <p>{description}</p>
                    <p className="font-bold text-3xl text-primary">{studentName}</p>
                    <p>{isBonafide ? "has requested this certificate for the purpose of" : "for successfully completing the course"}</p>
                    <p className="font-bold text-2xl">{isBonafide ? courseName.replace('Bonafide Certificate for ', '') : courseName}</p>
                    <p>on <span className="font-semibold">{completionDate}</span>.</p>
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
