import React from "react";
import { ResumeData } from "../data/ResumeDummyData";
import PersonalDetails from "./PersonalDetails";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import Skills from "./Skills";
import { useSectionStore } from "@/store/store";

interface ResumePreviewProps {
  resumeInfo: ResumeData;
}

const ResumePreviewSection: React.FC<ResumePreviewProps> = ({ resumeInfo }) => {
  const { sectionsOrder } = useSectionStore();

  const renderForm = (section: string) => {
    switch (section) {
      case "Experience":
        return <Experience resumeInfo={resumeInfo} />;
      case "Education":
        return <Education resumeInfo={resumeInfo} />;
      case "Skills":
        return <Skills resumeInfo={resumeInfo} />;
      case "Projects":
        return <Projects resumeInfo={resumeInfo} />;
      default:
        return null;
    }
  };
  return (
    <div className="shadow-lg  mt-7 px-8 py-5 bg-white shadow-black/[0.4]">
      <PersonalDetails resumeInfo={resumeInfo} />
      {sectionsOrder.map((section) => (
        <div key={section} className="mb-4">
          {renderForm(section)}
        </div>
      ))}
    </div>
  );
};

export default ResumePreviewSection;
