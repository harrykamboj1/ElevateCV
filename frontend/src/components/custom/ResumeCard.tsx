import React from "react";

interface ResumeCardProps {
  resume: {
    email: string;
    title: string;
    userId: number;
    resumeId: string;
    modifiedAt: Date;
  };
  key: number;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ resume, key }) => {
  return (
    <div
      key={key}
      className="relative border p-2 shadow-md hover:cursor-pointer bg-blue-700 rounded-lg h-60 overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-customDarkBlue to-blue-400 opacity-70 transition-opacity duration-300 hover:opacity-100"></div>

      <div className="absolute bottom-4 left-4 text-left z-10">
        <h1 className="font-semibold font-openSans text-lg text-white">
          {resume.title}
        </h1>
        <p className="text-gray-200 font-semibold font-openSans text-xs mt-1">
          Modified on:{" "}
          {resume.modifiedAt
            ? new Date(resume.modifiedAt).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      <div className="absolute inset-0 rounded-lg transform transition-transform duration-300 hover:scale-110" />
    </div>
  );
};

export default ResumeCard;
