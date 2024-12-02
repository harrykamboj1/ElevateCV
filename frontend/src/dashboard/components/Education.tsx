import React from "react";
import { ResumeData } from "../data/ResumeDummyData";
import { useEducationState } from "@/store/store";

interface ResumePreviewProps {
  resumeInfo: ResumeData;
}

const Education: React.FC<ResumePreviewProps> = ({ resumeInfo }) => {
  const { educationDetails } = useEducationState();
  return (
    <div className="mt-4">
      <h1 className="text-sm font-semibold font-openSans cursor-pointer mb-1">
        EDUCATION
      </h1>
      <hr></hr>
      <div>
        {educationDetails.length == 0 &&
          resumeInfo?.education?.map((data, index) => (
            <div
              key={index}
              className="text-xs font-normal font-openSans cursor-pointer mt-2"
            >
              <div className="flex justify-between px-4">
                <h1 className="font-bold">{data?.institution}</h1>
                <h1 className="text-gray-700">{data?.location}</h1>
              </div>
              <div className="flex justify-between px-4 text-gray-700">
                <h1>{data?.degree}</h1>
                <h1>{data?.graduationYear}</h1>
              </div>
            </div>
          ))}
        {educationDetails.length > 0 &&
          educationDetails?.map((data, index) => (
            <div
              key={index}
              className="text-xs font-normal font-openSans cursor-pointer mt-2"
            >
              <div className="flex justify-between px-4">
                <h1 className="font-bold">{data?.institution}</h1>
                <h1 className="text-gray-700">{data?.location}</h1>
              </div>
              <div className="flex justify-between px-4 text-gray-700">
                <h1>{data?.degree}</h1>
                <h1>{data?.graduationYear}</h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Education;
