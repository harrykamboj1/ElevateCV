import React from "react";
import { ResumeData } from "../data/ResumeDummyData";
import { useProjectsFormState } from "@/store/store";

interface ResumePreviewProps {
  resumeInfo: ResumeData;
}

const Projects: React.FC<ResumePreviewProps> = ({ resumeInfo }) => {
  const { projects } = useProjectsFormState();

  const formatDateRange = (startDate: string, endDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
    };
    const start = startDate
      ? new Date(startDate).toLocaleDateString("en-US", options)
      : "";
    const end = endDate
      ? new Date(endDate).toLocaleDateString("en-US", options)
      : "";

    if (startDate == "" && endDate == "") {
      return "";
    }
    return `${start} - ${end}`;
  };
  return (
    <div className="mt-2">
      <h1 className="text-sm font-semibold font-openSans cursor-pointer mb-1">
        PROJECTS
      </h1>
      <hr></hr>
      {projects.length == 0 &&
        resumeInfo?.projects.map((data, index) => (
          <div
            key={index}
            className="px-3 text-xs font-normal font-openSans cursor-pointer py-3"
          >
            <div className="flex justify-between font-openSans">
              <div className="">
                <h1 className="font-bold">{data?.title}</h1>

                <div className="flex">
                  <h1 className="font-semibold">{data?.techStack}</h1>
                </div>
              </div>
              <div className="flex">
                <span className="text-gray-700">
                  {data?.startDate} - {data?.endDate}
                </span>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: data?.description }} />
          </div>
        ))}
      {projects.length > 0 &&
        projects.map((data, index) => (
          <div
            key={index}
            className="px-3 text-xs font-normal font-openSans cursor-pointer py-3"
          >
            <div className="flex justify-between font-openSans">
              <div className="">
                <h1 className="font-bold">{data?.title}</h1>

                <div className="flex">
                  <h1 className="font-semibold">{data?.techStack}</h1>
                </div>
              </div>
              <div className="flex">
                <span className="text-gray-700">
                  {formatDateRange(data?.startDate, data?.endDate)}
                </span>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: data?.description }} />
          </div>
        ))}
    </div>
  );
};

export default Projects;
