import React, { useState } from "react";
import TextEditor from "../components/TextEditor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { v4 as uuid } from "uuid";
import {
  ExperienceFormStore,
  useDataSaveType,
  useExperienceFormStore,
  useResumeState,
} from "@/store/store";
import { Button } from "@/components/ui/button";
import { Brain, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const formField: ExperienceFormStore = {
  id: "",
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
  location: "",
  isPresent: "false",
};

const ExperienceForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectIndex, setSelectedIndex] = useState(0);
  const setIsDataSave = useDataSaveType((state) => state.setIsDataSave);
  const resumeAddExp = useResumeState((state) => state.addExperience);
  const resumeRemoveExp = useResumeState((state) => state.deleteExperience);
  const updateResumeExp = useResumeState((state) => state.updateExperience);
  const { experiences, addExperience, removeExperience, updateExperience } =
    useExperienceFormStore();
  const handleAddExperience = () => {
    const experienceWithId = { ...formField, id: uuid() };
    addExperience(experienceWithId);
    resumeAddExp(experienceWithId);
    setIsDataSave(false);
  };

  const handleDelete = () => {
    if (experiences.length === 0) return;

    const lastExperience = experiences[experiences.length - 1];
    removeExperience(lastExperience.id);
    resumeRemoveExp(lastExperience.id);
    setIsDataSave(false);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newEntries = experiences.slice();
    const { name, value } = e.target;

    newEntries[index][name as keyof ExperienceFormStore] = value;
    updateExperience(newEntries[index].id, newEntries[index]);
    updateResumeExp(newEntries[index].id, newEntries[index]);
    setIsDataSave(false);
  };

  const handleTextEditor = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    name: string,
    index: number
  ) => {
    const newEntries = experiences.slice();
    newEntries[index][name as keyof ExperienceFormStore] = e.target.value;
    updateExperience(newEntries[index].id, newEntries[index]);
    updateResumeExp(newEntries[index].id, newEntries[index]);
    setIsDataSave(false);
  };

  const handleCheckChange = (
    e: boolean | string,
    name: string,
    index: number
  ) => {
    const newEntries = experiences.slice();
    newEntries[index][name as keyof ExperienceFormStore] = e.toString();
    updateExperience(newEntries[index].id, newEntries[index]);
    setIsDataSave(false);
  };

  const generateSummaryFromAi = (index: number) => {
    setOpenDialog(true);
    setSelectedIndex(index);
    setIsDataSave(false);
  };

  return (
    <>
      <div className="px-5 py-10 h-full   border-2 border-blue-500  rounded-xl p-6 shadow-xl      bg-customDarkBlue ">
        <h1 className="text-2xl text-blue-600 font-dmSans font-semibold">
          Professional Experience
        </h1>
        <p className="text-white font-dmSans font-normal text-sm">
          Add your Job Experience
        </p>
        <div className="border my-3 border-zinc-300"></div>
        {experiences.map((val, index) => (
          <div
            key={val.id}
            className="mt-5 border border-zinc-300 p-5 shadow-lg rounded-md"
          >
            <div className="flex flex-col"></div>
            <div className="grid grid-cols-2 gap-x-2 mt-3">
              <div>
                <Label className="text-sm text-red-500 font-dmSans font-semibold">
                  Position Title
                </Label>
                <Input
                  placeholder="Full Stack Developer"
                  name="position"
                  value={val.position}
                  autoComplete="off"
                  onChange={(event) => handleChange(index, event)}
                  className="mt-1 border-zinc-300 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
                />
              </div>
              <div>
                <Label className="text-sm text-red-500 font-dmSans font-semibold">
                  Company Name
                </Label>
                <Input
                  placeholder="Tech Innovators Inc."
                  name="company"
                  value={val.company}
                  autoComplete="off"
                  onChange={(event) => handleChange(index, event)}
                  className="mt-1 border-zinc-300 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
                />
              </div>

              <div className="col-span-1 mt-4">
                <Label className="text-sm text-red-500 font-dmSans font-semibold">
                  Location
                </Label>
                <Input
                  placeholder="San Francisco, CA"
                  name="location"
                  value={val.location}
                  autoComplete="off"
                  onChange={(event) => handleChange(index, event)}
                  className="mt-1 border-zinc-300 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
                />
              </div>
              <div className="col-span-1 mt-4">
                <Label className="text-sm text-red-500 font-dmSans font-semibold">
                  Start Date
                </Label>
                <Input
                  name="startDate"
                  type="date"
                  value={val.startDate}
                  autoComplete="off"
                  onChange={(event) => handleChange(index, event)}
                  className="mt-1 border-zinc-300 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent "
                  style={{
                    colorScheme: "dark",
                  }}
                />
              </div>
              <div className="col-span-1 mt-4">
                <Label className="text-sm text-red-500 font-dmSans font-semibold">
                  End Date
                </Label>
                <Input
                  disabled={val.isPresent == "true"}
                  type="date"
                  name="endDate"
                  value={val.endDate}
                  autoComplete="off"
                  onChange={(event) => handleChange(index, event)}
                  className="mt-1 border-zinc-300 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
                  style={{
                    colorScheme: "dark",
                  }}
                />
              </div>
              <div className="col-span-1 flex  justify-start px-10 mt-10">
                <div className="flex gap-x-3 items-center">
                  <Checkbox
                    className="border-white"
                    name="isPresent"
                    checked={val.isPresent == "true"}
                    value={val.isPresent}
                    onCheckedChange={(event) =>
                      handleCheckChange(event, "isPresent", index)
                    }
                  />
                  <Label className="text-sm text-red-500 font-dmSans font-semibold">
                    Present
                  </Label>
                </div>
              </div>
              <div className="col-span-1 mt-10">
                <Button
                  onClick={() => generateSummaryFromAi(index)}
                  className="flex items-center font-dmSans  rounded-lg px-6 py-2.5 border-2 border-red-600 bg-red-600 hover:bg-red-700"
                >
                  <Brain /> Ask AI
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <TextEditor
                saveValue={val.responsibilities}
                index={selectIndex}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                onTextEditorChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement>
                ) => handleTextEditor(e, "responsibilities", index)}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-start mt-4 gap-x-4">
          <Button
            onClick={handleAddExperience}
            className="flex items-center bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2.5  font-dmSans text-white "
          >
            <Plus /> Add Experience
          </Button>
          <Button
            onClick={handleDelete}
            className="flex items-center font-dmSans  rounded-lg px-8 py-2.5 border-2 border-red-600 bg-red-600 hover:bg-red-700"
          >
            Delete Experience
          </Button>
        </div>
      </div>
    </>
  );
};

export default ExperienceForm;
