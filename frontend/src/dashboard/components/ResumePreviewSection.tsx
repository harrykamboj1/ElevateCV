import React from "react";
import { ResumeData } from "../data/ResumeDummyData";
import PersonalDetails from "./PersonalDetails";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import Skills from "./Skills";

interface ResumePreviewProps {
  resumeInfo: ResumeData;
}

const ResumePreviewSection: React.FC<ResumePreviewProps> = ({ resumeInfo }) => {
  return (
    <div className="shadow-lg  mt-7 px-8 py-5 bg-white shadow-black/[0.4]">
      <PersonalDetails resumeInfo={resumeInfo} />
      <Education resumeInfo={resumeInfo} />
      <Experience resumeInfo={resumeInfo} />
      <Projects resumeInfo={resumeInfo} />
      <Skills resumeInfo={resumeInfo} />
    </div>
  );
};

export default ResumePreviewSection;
