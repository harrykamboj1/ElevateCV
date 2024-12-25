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
  title: string;
}

const ResumePreviewSection: React.FC<ResumePreviewProps> = ({
  resumeInfo,
  title,
}) => {
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
    <>
      <div className="flex justify-center underline">
        <h1
          className="text-3xl text-red-600 hover:cursor-pointer font-dmSans  font-semibold"
          id="title"
        >
          {title}
        </h1>
      </div>
      <div
        id="reviewSection"
        className="shadow-lg  mt-4 px-8 py-5 mb-8 min-h-screen bg-white shadow-black/[0.4] "
      >
        <PersonalDetails resumeInfo={resumeInfo} />
        {sectionsOrder.map((section) => (
          <div key={section} className="mb-4">
            {renderForm(section)}
          </div>
        ))}
      </div>
    </>
  );
};

export default ResumePreviewSection;
