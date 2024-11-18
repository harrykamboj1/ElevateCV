import React from "react";
import { ResumeData } from "../data/ResumeDummyData";

interface ResumePreviewProps {
  resumeInfo: ResumeData;
}

const PersonalDetails: React.FC<ResumePreviewProps> = ({ resumeInfo }) => {
  const formatLink = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };
  return (
    <div>
      <h1 className="text-center text-2xl font-medium font-openSans">
        {resumeInfo?.basicInfo?.name}
      </h1>
      <div className="text-xs font-normal text-center font-openSans">
        <a href={`tel:${resumeInfo.basicInfo.contact.phone}`}>
          {resumeInfo.basicInfo.contact.phone}
        </a>
        {" | "}
        <a href={`mailto:${resumeInfo.basicInfo.contact.email}`}>
          {resumeInfo.basicInfo.contact.email}
        </a>
        {" | "}
        <a
          href={formatLink(resumeInfo.basicInfo.contact.linkedin)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black underline"
        >
          LinkedIn
        </a>

        {" | "}
        <a
          href={formatLink(resumeInfo.basicInfo.contact.github)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black underline"
        >
          Github
        </a>

        {resumeInfo?.basicInfo?.contact?.portfolio && (
          <>
            {" | "}
            <a
              href={formatLink(resumeInfo?.basicInfo?.contact?.portfolio)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline"
            >
              Portfolio
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;
