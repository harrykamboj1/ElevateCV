import React from "react";

interface ResumeCardProps {
  resume: {
    email: string;
    title: string;
    userId: number;
    resumeId: string;
  };
  key: number;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ resume, index }) => {
  return <div>ResumeCard</div>;
};

export default ResumeCard;
