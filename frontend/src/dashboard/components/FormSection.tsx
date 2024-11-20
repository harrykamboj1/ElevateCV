import useFormStore from "@/store/store";
import PersonalForm from "../Forms/PersonalForm";
import ExperienceForm from "../Forms/ExperienceForm";
import EducationForm from "../Forms/EducationForm";
import SkillsForm from "../Forms/SkillsForm";
import ProjectForm from "../Forms/ProjectForm";

const FormSection = () => {
  const formSectionCount = useFormStore((state) => state.formIndex);
  return (
    <div>
      {formSectionCount == 1 && <PersonalForm />}
      {formSectionCount == 3 && <ExperienceForm />}
      {formSectionCount == 4 && <EducationForm />}
      {formSectionCount == 5 && <SkillsForm />}
      {formSectionCount == 6 && <ProjectForm />}
    </div>
  );
};

export default FormSection;
