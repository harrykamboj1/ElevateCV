import { useDataSaveType, useFormStore } from "@/store/store";
import { useState } from "react";
import PersonalForm from "../Forms/PersonalForm";
import ExperienceForm from "../Forms/ExperienceForm";
import EducationForm from "../Forms/EducationForm";
import SkillsForm from "../Forms/SkillsForm";
import ProjectForm from "../Forms/ProjectForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionOrder from "./SectionOrder";
import { ResumeData } from "../data/ResumeDummyData";
import toast from "react-hot-toast";

type FormType = {
  resumeId: string | undefined;
  resumeInfo: ResumeData;
};

const FormSection: React.FC<FormType> = ({ resumeId }) => {
  const navigate = useNavigate();
  const updateState = useFormStore((state) => state.updateState);
  const isDataSave = useDataSaveType((state) => state.isDataSave);
  const [active, setActive] = useState(1);
  const changeFormType = (index: number) => {
    updateState(index);
    setActive(index);
  };

  const navigateToDownload = () => {
    if (!isDataSave) {
      toast.error("Please save resume data first");
      return;
    }
    navigate(`/download/resume/${resumeId}`);
  };

  return (
    <>
      <div className="px-8">
        <div className="flex justify-between">
          <div className="py-4">
            {
              <Button
                className="flex items-center gap-x-2 font-dmSans border  rounded-lg px-8 py-2.5 border-blue-600  hover:bg-blue-700"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </Button>
            }
          </div>
          <div className="flex justify-end py-4 gap-x-3">
            {active > 1 && (
              <Button
                className="bg-neutral-600 font-dmSans  rounded-md flex items-center px-8  hover:bg-neutral-700"
                onClick={() => changeFormType(active - 1)}
              >
                <ArrowLeft /> Back
              </Button>
            )}
            {active < 6 && (
              <Button
                className="flex items-center font-dmSans  rounded-lg px-14 py-2.5 border-2 border-blue-700 hover:bg-blue-700 bg-blue-600"
                onClick={() => changeFormType(active + 1)}
              >
                Next <ArrowRight />
              </Button>
            )}
            {active == 6 && (
              <Button
                className="flex items-center font-dmSans  rounded-lg px-10 py-2.5 border-2 border-red-600 bg-red-600 hover:bg-red-700"
                onClick={() => navigateToDownload()}
              >
                Download Resume
              </Button>
            )}
          </div>
        </div>
        <div>
          {active == 1 && <PersonalForm />}
          {active == 2 && <ExperienceForm />}
          {active == 3 && <EducationForm />}
          {active == 4 && <SkillsForm />}
          {active == 5 && <ProjectForm />}
          {active == 6 && <SectionOrder resumeId={resumeId} />}
        </div>
      </div>
    </>
  );
};

export default FormSection;
