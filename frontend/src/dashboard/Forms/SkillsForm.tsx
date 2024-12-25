import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useDataSaveType,
  useResumeState,
  useSkillsFormState,
} from "@/store/store";
import { X } from "lucide-react";
import React, { useState } from "react";

const SkillsForm = () => {
  const {
    languages,
    frameworks,
    developerTools,
    addLanguages,
    addDeveloperTools,
    addFrameworks,
    removeDeveloperTools,
    removeLanguages,
    removeFrameworks,
  } = useSkillsFormState();

  const setIsDataSave = useDataSaveType((state) => state.setIsDataSave);
  const [inputValue, setInputValue] = useState("");
  const [frameworkInputValue, setFrameworkInputValue] = useState("");
  const [developerToolsInputValue, setDeveloperToolsValue] = useState("");
  const setSkillsForResume = useResumeState((state) => state.setSkills);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    name: string
  ) => {
    if (name === "languages") {
      if (e.key === "Enter" && inputValue.trim() !== "") {
        if (!languages.includes(inputValue.trim())) {
          addLanguages(inputValue.trim());
          setSkillsForResume({
            languages: [...languages, inputValue.trim()],
            frameworks,
            developerTools,
          });
        }
        setInputValue("");
      }
    } else if (name === "frameworks") {
      if (e.key === "Enter" && frameworkInputValue.trim() !== "") {
        if (!frameworks.includes(frameworkInputValue.trim())) {
          addFrameworks(frameworkInputValue.trim());
          setSkillsForResume({
            languages,
            frameworks: [...frameworks, frameworkInputValue.trim()],
            developerTools,
          });
        }
        setFrameworkInputValue("");
      }
    } else if (name === "developerTools") {
      if (e.key === "Enter" && developerToolsInputValue.trim() !== "") {
        if (!developerTools.includes(developerToolsInputValue.trim())) {
          addDeveloperTools(developerToolsInputValue.trim());
          setSkillsForResume({
            languages,
            frameworks,
            developerTools: [
              ...developerTools,
              developerToolsInputValue.trim(),
            ],
          });
        }
        setDeveloperToolsValue("");
      }
    }
    setIsDataSave(false);
  };

  const handleDeleteSkill = (skillToDelete: string): void => {
    removeLanguages(skillToDelete);
    const result = languages.filter((item) => item !== skillToDelete);
    setSkillsForResume({ languages: result, frameworks, developerTools });
    setIsDataSave(false);
  };
  const handleFrameworks = (skillToDelete: string): void => {
    removeFrameworks(skillToDelete);
    const result = frameworks.filter((item) => item !== skillToDelete);

    setSkillsForResume({ languages, frameworks: result, developerTools });
    setIsDataSave(false);
  };
  const handleDeveloperTools = (skillToDelete: string): void => {
    removeDeveloperTools(skillToDelete);
    const result = developerTools.filter((item) => item !== skillToDelete);
    setSkillsForResume({ languages, frameworks, developerTools: result });
    setIsDataSave(false);
  };

  return (
    <>
      <div className="px-5 py-10 h-full    border-2 border-zinc-500  rounded-xl p-6 shadow-xl      bg-customDarkGrey  ">
        <h1 className="text-2xl text-red-600 font-dmSans  font-semibold">
          Skills
        </h1>
        <p className="text-white font-dmSans font-normal text-sm">
          Add your Professional Skills
        </p>
        <div className="border my-3 border-zinc-500"></div>

        <div className="mt-5 border border-zinc-500 p-5 shadow-lg rounded-xl">
          <div className="grid grid-cols-1 gap-x-2 mt-3">
            <div>
              <Label className="text-md text-red-600 font-dmSans font-semibold">
                Languages
              </Label>
            </div>
            <div>
              <Input
                placeholder="Eg. Javascript, Java, Typescript"
                name="languages"
                value={inputValue}
                autoComplete="off"
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event, "languages")}
                className="mt-1 border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {languages.map((skill, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center  font-dmSans text-xs font-semibold text-white bg-red-600   shadow-lg px-2 py-1 rounded-xl mt-1"
              >
                {skill}
                <button
                  onClick={() => handleDeleteSkill(skill)}
                  className="ml-2  "
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
          </div>

          {/* Frameworks */}
          <div className="grid grid-cols-1 gap-x-2 mt-3">
            <div>
              <Label className="text-md text-red-600 font-dmSans font-semibold">
                Frameworks
              </Label>
            </div>
            <div>
              <Input
                placeholder="Eg. React.js, Next.js"
                name="frameworks"
                autoComplete="off"
                value={frameworkInputValue}
                onChange={(event) => setFrameworkInputValue(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event, "frameworks")}
                className="mt-1 border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {frameworks.map((skill, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center  font-dmSans text-xs font-semibold text-white bg-red-600   shadow-lg px-2 py-1 rounded-xl mt-1"
              >
                {skill}
                <button
                  onClick={() => handleFrameworks(skill)}
                  className="ml-2  text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-x-2 mt-3">
            <div>
              <Label className="text-md text-red-600 font-dmSans font-semibold">
                Developer Tools
              </Label>
            </div>
            <div>
              <Input
                placeholder="Eg. Git, Github"
                name="developerTools"
                autoComplete="off"
                value={developerToolsInputValue}
                onChange={(event) => setDeveloperToolsValue(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event, "developerTools")}
                className="mt-1 border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {developerTools.map((skill, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center  font-dmSans text-xs font-semibold text-white bg-red-600   shadow-lg px-2 py-1 rounded-xl mt-1"
              >
                {skill}
                <button
                  onClick={() => handleDeveloperTools(skill)}
                  className="ml-2  text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillsForm;
