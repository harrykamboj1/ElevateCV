import React from "react";
import { ResumeData } from "../data/ResumeDummyData";
interface ResumePreviewProps {
  resumeInfo: ResumeData;
}

const Skills: React.FC<ResumePreviewProps> = ({ resumeInfo }) => {
  return (
    <div className="mt-2 pb-20">
      <h1 className="text-sm font-semibold font-openSans cursor-pointer mb-1">
        SKILLS
      </h1>
      <hr></hr>
      <div className="text-xs font-normal font-openSans  cursor-pointer mt-1 px-3">
        <div className="flex">
          <h1 className="font-bold">Languages </h1>
          {" : "}
          <div className="flex">
            {resumeInfo?.skills.languages.map((data, index) => (
              <p key={index} className="gap-x-2">
                {index == 0 ? " " : ", "}
                {data}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="text-xs font-normal font-openSans  cursor-pointer  px-3">
        <div className="flex">
          <h1 className="font-bold">Frameworks </h1>
          {" : "}
          <div className="flex">
            {resumeInfo?.skills.frameworks.map((data, index) => (
              <p key={index} className="gap-x-2">
                {index == 0 ? " " : ", "}
                {data}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="text-xs font-normal font-openSans  cursor-pointer  px-3">
        <div className="flex">
          <h1 className="font-bold">Developer Tools </h1>
          {" : "}
          <div className="flex">
            {resumeInfo?.skills.developerTools.map((data, index) => (
              <p key={index} className="gap-x-2">
                {index == 0 ? " " : ", "}
                {data}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
