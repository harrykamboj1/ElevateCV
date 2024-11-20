import React from "react";
import { ResumeData } from "../data/ResumeDummyData";

interface ResumePreviewProps {
  resumeInfo: ResumeData;
}

const Projects: React.FC<ResumePreviewProps> = ({ resumeInfo }) => {
  return (
    <div className="mt-2">
      <h1 className="text-sm font-semibold font-openSans cursor-pointer mb-1">
        PROJECTS
      </h1>
      <hr></hr>
      {resumeInfo?.projects.map((data, index) => (
        <div
          key={index}
          className="px-3 text-xs font-normal font-openSans cursor-pointer py-2"
        >
          <div className="flex justify-between font-openSans">
            <div className="">
              <h1 className="font-bold">{data?.title}</h1>

              <div className="flex">
                {data.techStack.map((skill, index) => (
                  <p key={index}>
                    {index == 0 ? " " : ", "}
                    {skill}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex">
              <span className="text-gray-700">
                {data?.startDate} - {data?.endDate}
              </span>
            </div>
          </div>

          <ul className="list-disc list-inside mt-1">
            {data.description.map((responsibility, idx) => (
              <li key={idx} className="text-gray-700">
                {responsibility}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Projects;
