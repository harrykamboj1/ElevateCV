import FormSection from "@/dashboard/components/FormSection";
import ResumePreviewSection from "@/dashboard/components/ResumePreviewSection";
import { dummyData, ResumeData } from "@/dashboard/data/ResumeDummyData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

export const EditResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState<ResumeData>();
  useEffect(() => {
    if (!dummyData) {
      return;
    }
    setResumeInfo(dummyData);
  }, []);
  if (!resumeInfo) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r bg-white">
        <ScaleLoader
          color={"#072354"}
          height={60}
          width={10}
          radius={6}
          margin={4}
        />
      </div>
    );
  }
  return (
    <div className="flex p-6 bg-blue-100 gap-x-5 overflow-y-auto">
      <div className="flex-1">
        <FormSection />
      </div>
      <div className="flex-1">
        <ResumePreviewSection resumeInfo={resumeInfo!} />
      </div>
    </div>
  );
};
