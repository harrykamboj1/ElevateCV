import AddResume from "@/components/custom/AddResume";
import ResumeCard from "@/components/custom/ResumeCard";
import useAuth from "@/hooks/useAuth";
import { apiUrl } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

type ResumeListType = {
  email: string;
  title: string;
  userId: number;
  resumeId: string;
}[];

const Dashboard = () => {
  const { user, isSignedIn, isLoading } = useAuth();
  const [resumeList, setResumeList] = useState<ResumeListType>([]);

  useEffect(() => {
    const getAllResumeByUser = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios
          .post(
            `${apiUrl}/resume/getAllResumeByUserId`,
            { email: user!.email },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            setResumeList(response.data.resume);
          });
      } catch (e) {
        console.log("Error while fetching user resume :: " + e);
      }
    };
    getAllResumeByUser();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r bg-white">
        <ScaleLoader
          color={"#072354"}
          height={60}
          width={10}
          radius={6}
          margin={4}
        />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h1 className="font-openSans text-customDarkBlue font-bold text-xl">
        My Resume
      </h1>
      <p className="font-openSans text-gray-500 text-sm">
        Build your brand-new resume in as little as 3 minutes.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-8 mt-10">
        <AddResume email={user!.email} />
        {resumeList!.map((resume, index) => (
          <ResumeCard resume={resume} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
