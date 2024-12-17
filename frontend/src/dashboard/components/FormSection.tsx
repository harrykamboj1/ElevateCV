import { useFormStore } from "@/store/store";
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

type FormType = {
  resumeId: string | undefined;
  resumeInfo: ResumeData;
};

const FormSection: React.FC<FormType> = ({ resumeId }) => {
  // const [cards, setCards] = useState<Card[]>(CARDS);
  const navigate = useNavigate();
  const updateState = useFormStore((state) => state.updateState);
  const [active, setActive] = useState(1);
  const changeFormType = (index: number) => {
    updateState(index);
    setActive(index);
  };
  // useEffect(() => {
  //   startFlipping(formSectionCount);
  // }, [formSectionCount]);

  // const startFlipping = (index: number) => {
  //   setCards((prevCards: Card[]) => {
  //     const newArray = [...prevCards];
  //     const selectedCard = newArray.find((card) => card.id === index);
  //     if (selectedCard) {
  //       newArray.splice(newArray.indexOf(selectedCard), 1);
  //       newArray.unshift(selectedCard);
  //     }
  //     return newArray;
  //   });
  // };

  return (
    // <div className="relative mt-10 flex flex-col justify-center items-center h-screen ">
    //   {cards.map((card, index) => {
    //     return (
    //       <motion.div
    //         key={card.id}
    //         className="absolute bg-white h-[28rem] w-[36rem] md:h-[36rem] border-t-customDarkBlue border-t-4 md:w-[36rem] rounded-3xl p-6 shadow-xl border border-neutral-200 shadow-black/[0.4] flex flex-col justify-between"
    //         style={{
    //           transformOrigin: "top center",
    //         }}
    //         animate={{
    //           top: index * 3, // Adjust card stacking
    //           scale: 1 - index * 0.06,
    //           zIndex: cards.length - index,
    //         }}
    //       >
    //         <div className="font-normal text-neutral-700 dark:text-neutral-200">
    //           {card.content}
    //         </div>
    //       </motion.div>
    //     );
    //   })}
    // </div>
    <div className="px-8">
      <div className="flex justify-between">
        <div className="py-4">
          {
            <Button
              className="bg-gray-700 hover:bg-gray-900 p-x-2 w-36"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
          }
        </div>
        <div className="flex justify-end py-4 gap-x-3">
          {active > 1 && (
            <Button
              className="bg-gray-700 hover:bg-gray-900 p-x-2 w-36"
              onClick={() => changeFormType(active - 1)}
            >
              <ArrowLeft /> Back
            </Button>
          )}
          {active < 6 && (
            <Button
              className="bg-blue-800 hover:bg-blue-900 p-x-2 w-36"
              onClick={() => changeFormType(active + 1)}
            >
              Next <ArrowRight />
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
  );
};

// const CARDS = [
//   {
//     id: 1,
//     content: <PersonalForm />,
//   },
//   {
//     id: 3,
//     content: <ExperienceForm />,
//   },
//   {
//     id: 4,
//     content: <EducationForm />,
//   },
//   {
//     id: 5,
//     content: <SkillsForm />,
//   },
//   {
//     id: 6,
//     content: <ProjectForm />,
//   },
// ];

export default FormSection;
