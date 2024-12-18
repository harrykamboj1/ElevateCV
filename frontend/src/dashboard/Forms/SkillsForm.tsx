import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeState, useSkillsFormState } from "@/store/store";
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
  };

  const handleDeleteSkill = (skillToDelete: string): void => {
    removeLanguages(skillToDelete);
    const result = languages.filter((item) => item !== skillToDelete);
    setSkillsForResume({ languages: result, frameworks, developerTools });
  };
  const handleFrameworks = (skillToDelete: string): void => {
    removeFrameworks(skillToDelete);
    const result = frameworks.filter((item) => item !== skillToDelete);

    setSkillsForResume({ languages, frameworks: result, developerTools });
  };
  const handleDeveloperTools = (skillToDelete: string): void => {
    removeDeveloperTools(skillToDelete);
    const result = developerTools.filter((item) => item !== skillToDelete);
    setSkillsForResume({ languages, frameworks, developerTools: result });
  };

  return (
    <>
      <div className="px-5 py-10 h-full   border-t-customDarkBlue border-t-4  rounded-3xl p-6 shadow-xl border  bg-white  shadow-black/[0.4] ">
        <h1 className="text-2xl text-customDarkBlue font-openSans font-semibold">
          Skills
        </h1>
        <p className="text-gray-600 font-openSans font-normal text-sm">
          Add your Professional Skills
        </p>
        <div className="border my-3 border-customDarkBlue"></div>

        <div className="mt-5 border border-customDarkBlue p-5 shadow-lg rounded-xl">
          <div className="grid grid-cols-1 gap-x-2 mt-3">
            <div>
              <Label className="text-md text-customDarkBlue font-openSans font-semibold">
                Languages
              </Label>
            </div>
            <div>
              <Input
                placeholder="Eg. Javascript, Java, Typescript"
                name="languages"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event, "languages")}
                className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {languages.map((skill, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center bg-blue-50 font-openSans text-xs font-semibold text-customDarkBlue border-2 border-customDarkBlue shadow-md px-2 py-1 rounded-full"
              >
                {skill}
                <button
                  onClick={() => handleDeleteSkill(skill)}
                  className="ml-2  text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Frameworks */}
          <div className="grid grid-cols-1 gap-x-2 mt-3">
            <div>
              <Label className="text-md text-customDarkBlue font-openSans font-semibold">
                Frameworks
              </Label>
            </div>
            <div>
              <Input
                placeholder="Eg. React.js, Next.js"
                name="frameworks"
                value={frameworkInputValue}
                onChange={(event) => setFrameworkInputValue(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event, "frameworks")}
                className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {frameworks.map((skill, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center bg-blue-50 font-openSans text-xs font-semibold text-customDarkBlue border-2 border-customDarkBlue shadow-md px-2 py-1 rounded-full"
              >
                {skill}
                <button
                  onClick={() => handleFrameworks(skill)}
                  className="ml-2  text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-x-2 mt-3">
            <div>
              <Label className="text-md text-customDarkBlue font-openSans font-semibold">
                Developer Tools
              </Label>
            </div>
            <div>
              <Input
                placeholder="Eg. Git, Github"
                name="developerTools"
                value={developerToolsInputValue}
                onChange={(event) => setDeveloperToolsValue(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event, "developerTools")}
                className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {developerTools.map((skill, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center bg-blue-50 font-openSans text-xs font-semibold text-customDarkBlue border-2 border-customDarkBlue shadow-md px-2 py-1 rounded-full"
              >
                {skill}
                <button
                  onClick={() => handleDeveloperTools(skill)}
                  className="ml-2  text-red-800"
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
