import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // Icon for edit
import { MdDateRange } from "react-icons/md"; // Icon for date

interface ResumeCardProps {
  resume: {
    email: string;
    title: string;
    userId: number;
    resumeId: string;
    modifiedAt: Date;
  };
  key: number;
  cardKey: number;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ resume, cardKey }) => {
  return (
    <Link to={`/dashboard/resume/edit/${resume.resumeId}`}>
      <div
        key={cardKey}
        className="relative border p-4 shadow-md hover:cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg h-64 overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
      >
        {/* Background Icon */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://via.placeholder.com/400" // Replace with a better placeholder or design image
            alt="Background pattern"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Header Icon */}
        <div className="absolute top-4 right-4 z-10 text-white opacity-80">
          <FaEdit
            size={24}
            className="hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* Content */}
        <div className="absolute bottom-6 left-6 z-10 text-white">
          <h1 className="font-semibold text-2xl font-openSans mb-1">
            {resume.title}
          </h1>

          <div className="flex items-center text-sm text-gray-200 font-medium">
            <MdDateRange size={16} className="mr-2" />
            Modified on:{" "}
            {resume.modifiedAt
              ? new Date(resume.modifiedAt).toLocaleDateString()
              : "N/A"}
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40 transition-opacity duration-300 hover:opacity-60 rounded-lg"></div>
      </div>
    </Link>
  );
};

export default ResumeCard;
