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
    if (!url?.startsWith("http://") && !url?.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };
  return (
    <div>
      <div className="flex justify-center gap-x-1 pt-5">
        <h1 className="text-center text-2xl font-medium font-openSans">
          {firstName ? firstName : resumeInfo?.personalDetails?.firstName}
        </h1>

        <h1 className="text-center text-2xl font-medium font-openSans">
          {lastName ? lastName : resumeInfo?.personalDetails?.lastName}
        </h1>
      </div>
      <div className="text-xs font-normal text-center font-openSans">
        <a href={`tel:${resumeInfo.personalDetails?.phone}`}>
          {phone ? phone : resumeInfo.personalDetails?.phone}
        </a>
        {email != "" && (
          <>
            {" "}
            {phone != "" && " | "}
            <a href={`mailto:${resumeInfo.personalDetails?.email}`}>
              {email ? email : resumeInfo.personalDetails?.email}
            </a>
          </>
        )}

        {linkedin != "" && (
          <>
            {(email != "" || phone != "") && " | "}
            <a
              href={formatLink(
                linkedin ? linkedin : resumeInfo.personalDetails?.linkedin
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline"
            >
              LinkedIn
            </a>
          </>
        )}

        {github != "" && (
          <>
            {(linkedin != "" || email != "" || phone != "") && " | "}
            <a
              href={formatLink(
                github ? github : resumeInfo.personalDetails?.github
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline"
            >
              Github
            </a>
          </>
        )}

        {portfolio != "" && (
          <>
            {(github != "" || linkedin != "" || email != "" || phone != "") &&
              " | "}
            <a
              href={formatLink(
                portfolio ? portfolio : resumeInfo?.personalDetails?.portfolio
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
