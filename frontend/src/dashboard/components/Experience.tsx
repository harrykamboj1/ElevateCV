import React from "react";
import { ResumeData } from "../data/ResumeDummyData";
import { useExperienceFormStore } from "@/store/store";

interface ResumePreviewProps {
  resumeInfo: ResumeData;
}

const Experience: React.FC<ResumePreviewProps> = ({ resumeInfo }) => {
  const { experiences } = useExperienceFormStore();

  const formatDateRange = (
    startDate: string,
    endDate: string,
    isPresent: string
  ) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
    };
    const start = startDate
      ? new Date(startDate).toLocaleDateString("en-US", options)
      : "";
    const end = endDate
      ? new Date(endDate).toLocaleDateString("en-US", options)
      : isPresent == "true"
      ? "Present"
      : "";

    if (startDate == "" && endDate == "") {
      return "";
    }
    return `${start} - ${end}`;
  };

  return (
    <>
      {experiences.length > 0 && (
        <div className="mt-2">
          <h1 className="text-sm font-semibold font-openSans cursor-pointer mb-1">
            EXPERIENCE
          </h1>
          <hr></hr>
          {experiences.length == 0 &&
            resumeInfo?.experience?.map((data, index) => (
              <div
                key={index}
                className="px-4 text-xs font-normal font-openSans cursor-pointer py-2"
              >
                <div className="flex justify-between ">
                  <h1 className="font-bold">{data?.position}</h1>
                  <h1 className="text-gray-700">
                    {data?.startDate + " - " + data?.endDate}
                  </h1>
                </div>
                <div className="flex justify-between text-gray-700">
                  <h1>{data?.company}</h1>
                  <h1>{data?.location}</h1>
                </div>

                <ul className="list-disc list-inside mt-1">
                  {data?.responsibilities}
                </ul>
              </div>
            ))}
          {experiences.length > 0 &&
            experiences.map((data, index) => (
              <div
                key={index}
                className="px-4 text-xs font-normal font-openSans cursor-pointer py-2"
              >
                <div className="flex justify-between ">
                  <h1 className="font-bold">{data?.position}</h1>
                  <h1 className="text-gray-700">
                    {formatDateRange(
                      data?.startDate,
                      data?.endDate,
                      data?.isPresent
                    )}
                  </h1>
                </div>
                <div className="flex justify-between text-gray-700">
                  <h1>{data?.company}</h1>
                  <h1>{data?.location}</h1>
                </div>

                <div
                  dangerouslySetInnerHTML={{ __html: data?.responsibilities }}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Experience;
