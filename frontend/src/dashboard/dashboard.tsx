import AddResume from "@/components/custom/AddResume";
import ResumeCard from "@/components/custom/ResumeCard";
import useAuth from "@/hooks/useAuth";
import { apiUrl, SuccessFlag } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Wrapper } from "@/components/custom/Wrapper";

type ResumeListType = {
  email: string;
  title: string;
  userId: number;
  resumeId: string;
  modifiedAt: Date;
}[];

const Dashboard = () => {
  const { user, isSignedIn, isLoading } = useAuth();
  const [resumeList, setResumeList] = useState<ResumeListType>([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteResumeId, setDeleteResumeId] = useState("");
  const [deleteResumeName, setDeleteResumeName] = useState("");
  const [loading, setLoading] = useState(false);

  const setIsDeleteOpenFxn = () => {
    setIsDeleteOpen(true);
  };
  const closeDelete = () => {
    setIsDeleteOpen(false)
  };
  const handleDeleteResumeId = (resumeId: string, resumeName: string) => {
    setDeleteResumeId(resumeId);
    setDeleteResumeName(resumeName);
  };

  const handleDeleteSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios
        .post(
          `${apiUrl}/resume/deleteResumeById`,
          { deleteResumeId, email: user!.email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.errorCode === SuccessFlag) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
          setLoading(false);
          setIsDeleteOpen(false);
          setDeleteResumeId("");
        });
    } catch (e) {
      console.log("Error while deleting the resume :: " + e);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
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
  }, [user, deleteResumeId]);

  if (isLoading && !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r bg-backgroundColor">
        <ScaleLoader
          color={"#2563eb"}
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
    <>
      <Toaster />
      <Wrapper>
        <div className="p-10 bg-backgroundColor overflow-auto">
          <h1 className="text-blue-600 font-bold font-dmSans text-3xl">{`${user!.name
            } Resumes`}</h1>
          <p className="font-openSans text-gray-200 text-sm">
            Build your brand-new resume in as little as 3 minutes.
          </p>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:grid-cols-4   2xl:grid-cols-4 mt-10">
            <AddResume email={user!.email} />
            {resumeList!.map((resume, index) => (
              <>
                <ResumeCard
                  resume={resume}
                  key={index}
                  cardKey={index}
                  setIsDeleteOpenFxn={setIsDeleteOpenFxn}
                  handleDeleteResumeId={handleDeleteResumeId}
                />
              </>
            ))}
          </div>
        </div>
      </Wrapper>

      <Dialog open={isDeleteOpen}>
        <DialogContent className="bg-customDarkBlue ">
          <DialogHeader>
            <DialogTitle className="text-2xl font-dmSans text-white font-bold">
              Delete Resume
            </DialogTitle>
            <DialogDescription>
              <div className="my-4">
                <p className="text-red-600 font-dmSans  font-semibold text-md">
                  {`Are you sure you want to delete ${deleteResumeName} resume`}
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => closeDelete()}
              className="bg-neutral-600  rounded-md flex items-center px-8  hover:bg-neutral-800"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteSubmit()}
              className="flex items-center  rounded-md px-8 text-md font-dmSans py-2.5 border-2 border-red-600 bg-red-600 hover:bg-red-700"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;
