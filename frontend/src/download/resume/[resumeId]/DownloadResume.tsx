import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import ResumePreviewSection from "@/dashboard/components/ResumePreviewSection";
import { dummyData, ResumeData } from "@/dashboard/data/ResumeDummyData";
import useAuth from "@/hooks/useAuth";
import { apiUrl } from "@/lib/constants";

import {
  useEducationState,
  useExperienceFormStore,
  usePersonalFormStore,
  useProjectsFormState,
  useSectionStore,
  useSkillsFormState,
} from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import ShareResume from "@/dashboard/components/Share";
import Confettii from "@/components/confetti";

const DownloadResume = () => {
  const params = useParams();
  const { user, isLoading, isSignedIn } = useAuth();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // Confetti state
  const openShare = () => setIsShareOpen(true);
  const closeShare = () => setIsShareOpen(false);
  const [resumeInfo, setResumeInfo] = useState<ResumeData | null>(null);
  const [title, setTitle] = useState("");
  const setPersonal = usePersonalFormStore((state) => state.setPersonal);
  const setExperience = useExperienceFormStore((state) => state.setExperience);
  const setProjects = useProjectsFormState((state) => state.setProjects);
  const setSectionOrder = useSectionStore((state) => state.setSectionOrder);
  const setEducation = useEducationState((state) => state.setEducation);
  const setSkills = useSkillsFormState((state) => state.setSkills);


  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  useEffect(() => {
    const fetchResumeDataById = async (resumeId: string) => {
      try {
        if (!user || isLoading) {
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authorization token missing.");
          return;
        }

        const response = await axios.post(
          `${apiUrl}/resume/getResumeById`,
          {
            email: user.email,
            resumeId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.data?.resume) {
          setResumeInfo(response.data!.resume);
          setTitle(response.data!.resume.title);
          setPersonal(response.data!.resume!.PersonalDetails);

          setExperience(response.data!.resume.Experience);

          setProjects(response.data!.resume.Projects);

          setEducation(response.data!.resume.Education);

          setSkills(response.data!.resume.Skills);

          setSectionOrder(response.data!.resume.SectionOrder.order);
          triggerConfetti();
        } else {
          toast.error("No Resume Details Found");
          setResumeInfo(dummyData);
        }
      } catch (e) {
        console.error("Error in fetching resume data:", e);
        toast.error("Something went wrong while fetching the resume.");
        setResumeInfo(dummyData);
      }
    };

    if (params.resumeId) {
      fetchResumeDataById(params.resumeId);
    }
  }, [params.resumeId, user, isLoading]);

  if (!resumeInfo || isLoading) {
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

  const handleDownload = () => {
    window.print();
  };



  return (
    <>
      {showConfetti && (
        <Confettii width={window.innerWidth} height={window.innerHeight} />
      )}
      <Header />
      <div id="noPrint">
        <div className="my-10 mx-10 md:mx-20 lg:mx-40">
          <h2 className="text-red-600 text-2xl font-dmSans font-bold text-center">{`${user!.name
            } Your ${title} Resume is ready!`}</h2>
          <p className="text-white text-center font-dmSans">
            Download and Share and get Ready for Job Hunt
          </p>
          <div className="flex justify-between">
            <Button
              className="flex items-center  font-dmSans font-semibold rounded-lg px-10 py-2.5 border-2 border-blue-600 bg-blue-600 hover:bg-blue-700"
              onClick={() => handleDownload()}
            >
              Download
            </Button>
            <Button
              className="flex items-center  font-dmSans font-semibold rounded-lg px-10 py-2.5 border-2 border-blue-600 bg-blue-600 hover:bg-blue-700"
              onClick={() => openShare()}
            >
              Share
            </Button>
          </div>
        </div>
      </div>
      <div className="my-10 mx-20 md:mx-20 lg:mx-80" id="print">
        <ResumePreviewSection resumeInfo={resumeInfo} title={title} />
      </div>
      {isShareOpen && (
        <div className="fixed inset-0 bg-customDarkBlue   bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-customDarkBlue p-6 rounded-lg border-2 border-neutral-600  shadow-lg text-center">
            <h2 className="text-2xl font-dmSans text-red-600 font-bold ">
              Share the Resume
            </h2>
            <ShareResume resumeId={params!.resumeId} />
            <Button
              onClick={closeShare}
              className="font-dmSans font-semibold rounded-lg px-10 py-2.5 border-2 border-blue-600 bg-blue-600 hover:bg-blue-700"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadResume;
