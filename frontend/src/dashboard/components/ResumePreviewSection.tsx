import React from "react";
import { ResumeData } from "../data/ResumeDummyData";
import PersonalDetails from "./PersonalDetails";

interface ResumePreviewProps {
  resumeInfo: ResumeData;
}

const ResumePreviewSection: React.FC<ResumePreviewProps> = ({ resumeInfo }) => {
  return (
    <div className="shadow-lg  h-full p-8 ">
      <PersonalDetails resumeInfo={resumeInfo} />
    </div>
  );
};

export default ResumePreviewSection;
