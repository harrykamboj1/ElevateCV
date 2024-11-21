import useFormStore from "@/store/store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PersonalForm from "../Forms/PersonalForm";
import ExperienceForm from "../Forms/ExperienceForm";
import EducationForm from "../Forms/EducationForm";
import SkillsForm from "../Forms/SkillsForm";
import ProjectForm from "../Forms/ProjectForm";

type Card = {
  id: number;
  content: React.ReactNode;
};

const FormSection = () => {
  const formSectionCount = useFormStore((state) => state.formIndex);

  const [cards, setCards] = useState<Card[]>(CARDS);

  useEffect(() => {
    startFlipping(formSectionCount);
  }, [formSectionCount]);

  const startFlipping = (index: number) => {
    setCards((prevCards: Card[]) => {
      const newArray = [...prevCards];
      const selectedCard = newArray.find((card) => card.id === index);
      if (selectedCard) {
        newArray.splice(newArray.indexOf(selectedCard), 1);
        newArray.unshift(selectedCard);
      }
      return newArray;
    });
  };

  return (
    <div className="relative mt-10 flex flex-col justify-center items-center h-screen">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-white h-[28rem] w-[36rem] md:h-[36rem] md:w-[36rem] rounded-3xl p-6 shadow-xl border border-neutral-200 shadow-black/[0.4] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * 3, // Adjust card stacking
              scale: 1 - index * 0.06,
              zIndex: cards.length - index,
            }}
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              {card.content}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const CARDS = [
  {
    id: 1,
    content: <PersonalForm />,
  },
  {
    id: 3,
    content: <ExperienceForm />,
  },
  {
    id: 4,
    content: <EducationForm />,
  },
  {
    id: 5,
    content: <SkillsForm />,
  },
  {
    id: 6,
    content: <ProjectForm />,
  },
];

export default FormSection;
