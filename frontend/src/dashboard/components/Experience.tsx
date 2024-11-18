import React from "react";
import { ResumeData } from "../data/ResumeDummyData";

interface ResumePreviewProps {
  resumeInfo: ResumeData;
}

const Experience: React.FC<ResumePreviewProps> = ({ resumeInfo }) => {
  return (
    <div className="mt-6">
      <h1 className="text-sm font-semibold font-openSans cursor-pointer mb-1">
        EXPERIENCE
      </h1>
      <hr></hr>
      {resumeInfo?.experience.map((data, index) => (
        <div
          key={index}
          className="px-4 text-xs font-normal font-openSans cursor-pointer py-2"
        >
          <div className="flex justify-between ">
            <h1 className="font-bold">{data?.position}</h1>
            <h1 className="text-gray-700">{data?.duration}</h1>
          </div>
          <div className="flex justify-between text-gray-700">
            <h1>{data?.company}</h1>
            <h1>{data?.location}</h1>
          </div>

          <ul className="list-disc list-inside mt-1">
            {data.responsibilities.map((responsibility, idx) => (
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

export default Experience;
