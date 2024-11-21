import React from "react";
import { ResumeData } from "../data/ResumeDummyData";
import { usePersonalFormStore } from "@/store/store";

interface ResumePreviewProps {
  resumeInfo: ResumeData;
}

const PersonalDetails: React.FC<ResumePreviewProps> = ({ resumeInfo }) => {
  const { firstName, lastName, email, phone, linkedin, github, portfolio } =
    usePersonalFormStore();
  const formatLink = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };
  return (
    <div>
      <div className="flex justify-center gap-x-1">
        <h1 className="text-center text-2xl font-medium font-openSans">
          {firstName ? firstName : resumeInfo?.basicInfo?.firstName}
        </h1>

        <h1 className="text-center text-2xl font-medium font-openSans">
          {lastName ? lastName : resumeInfo?.basicInfo?.lastName}
        </h1>
      </div>
      <div className="text-xs font-normal text-center font-openSans">
        <a href={`tel:${resumeInfo.basicInfo.contact.phone}`}>
          {phone ? phone : resumeInfo.basicInfo.contact.phone}
        </a>
        {" | "}
        <a href={`mailto:${resumeInfo.basicInfo.contact.email}`}>
          {email ? email : resumeInfo.basicInfo.contact.email}
        </a>
        {" | "}
        <a
          href={formatLink(
            linkedin ? linkedin : resumeInfo.basicInfo.contact.linkedin
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black underline"
        >
          LinkedIn
        </a>

        {" | "}
        <a
          href={formatLink(
            github ? github : resumeInfo.basicInfo.contact.github
          )}
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
              href={formatLink(
                portfolio
                  ? portfolio
                  : resumeInfo?.basicInfo?.contact?.portfolio
              )}
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
