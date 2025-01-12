import FormSection from "@/dashboard/components/FormSection";
import ResumePreviewSection from "@/dashboard/components/ResumePreviewSection";
import { dummyData, ResumeData } from "@/dashboard/data/ResumeDummyData";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { apiUrl } from "@/lib/constants";

import { Navigate, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import useAuth from "@/hooks/useAuth";
import {
  useDataSaveType,
  useEducationState,
  useExperienceFormStore,
  usePersonalFormStore,
  useProjectsFormState,
  useResumeState,
  useSectionStore,
  useSkillsFormState,
} from "@/store/store";

export const EditResume = () => {
  const params = useParams();
  const { user, isLoading, isSignedIn } = useAuth();
  const [title, setTitle] = useState("");
  const [resumeInfo, setResumeInfo] = useState<ResumeData | null>(null);
  const setIsDataSave = useDataSaveType((state) => state.setIsDataSave);
  const setPersonal = usePersonalFormStore((state) => state.setPersonal);
  const setExperience = useExperienceFormStore((state) => state.setExperience);
  const setProjects = useProjectsFormState((state) => state.setProjects);
  const setSectionOrder = useSectionStore((state) => state.setSectionOrder);
  const setEducation = useEducationState((state) => state.setEducation);
  const setSkills = useSkillsFormState((state) => state.setSkills);

  const setPersonalResumeData = useResumeState((state) => state.setPersonal);
  const setExperienceResumeData = useResumeState(
    (state) => state.setExperience
  );
  const setProjectsResumeData = useResumeState((state) => state.setProjects);
  const setEducationResumeData = useResumeState((state) => state.setEducation);
  const setSkillsResumeData = useResumeState((state) => state.setSkills);
  const setSectionResumeData = useResumeState(
    (state) => state.updateSectionOrder
  );
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
          setPersonalResumeData(response.data!.resume!.PersonalDetails);

          setExperience(response.data!.resume.Experience);
          setExperienceResumeData(response.data!.resume.Experience);

          setProjects(response.data!.resume.Projects);
          setProjectsResumeData(response.data!.resume.Projects);

          setEducation(response.data!.resume.Education);
          setEducationResumeData(response.data!.resume.Education);

          setSkills(response.data!.resume.Skills);
          setSkillsResumeData(response.data!.resume.Skills);

          setSectionOrder(response.data!.resume.SectionOrder.order);
          setSectionResumeData(response.data!.resume.SectionOrder.order);
          setIsDataSave(false);
        } else {
          toast.error("No Resume Details Found");
          setResumeInfo(dummyData);
          setIsDataSave(false);
        }
      } catch (e) {
        console.error("Error in fetching resume data:", e);
        toast.error("Something went wrong while fetching the resume.");
        setResumeInfo(dummyData);
        setIsDataSave(false);
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

  return (
    <>
      <Toaster />
      <div className="flex p-6 gap-x-5 h-screen">
        <div className="flex-1">
          <FormSection resumeId={params.resumeId!} resumeInfo={resumeInfo} />
        </div>
        <div className="flex-1">
          <ResumePreviewSection resumeInfo={resumeInfo} title={title} />
        </div>
      </div>
    </>
  );
};
