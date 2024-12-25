import React from "react";
import { Link } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { Trash2 } from "lucide-react";

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
  handleDeleteResumeId: (resumeId: string, resumeName: string) => void;
  setIsDeleteOpenFxn: () => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  cardKey,
  handleDeleteResumeId,
  setIsDeleteOpenFxn,
}) => {
  const openDelete = () => {
    handleDeleteResumeId(resume.resumeId, resume.title);
    setIsDeleteOpenFxn();
  };
  return (
    <>
      <div
        key={cardKey}
        className="flex-col border rounded-md relative flex aspect-[1/1.4142] hover:scale-105 shadow-lg border-red-600 cursor-pointer items-center justify-center bg-[#27272a] p-0 transition-transform space-y-0"
      >
        <div className="absolute top-4 right-4 z-10 text-white opacity-80">
          <Trash2
            onClick={(e) => {
              e.stopPropagation();
              openDelete();
            }}
            size={24}
            className="hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          />
        </div>

        <Link
          to={`/dashboard/resume/edit/${resume.resumeId}`}
          className="absolute inset-0"
        >
          <div className="absolute bottom-6 left-6 z-10 text-white">
            <h1 className="text-red-600 text-[18px] font-semibold font-dmSans mb-1">
              {resume.title}
            </h1>

            <div className="flex items-center text-sm text-white font-medium">
              <MdDateRange size={16} className="mr-2" />
              Modified on:{" "}
              {resume.modifiedAt
                ? new Date(resume.modifiedAt).toLocaleDateString()
                : "N/A"}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40 transition-opacity duration-300 hover:opacity-60 rounded-lg"></div>
        </Link>
      </div>
    </>
  );
};

export default ResumeCard;
