import React, { useState } from "react";
import TextEditor from "../components/TextEditor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ExperienceFormStore, useExperienceFormStore } from "@/store/store";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
  const { addExperience, removeExperience, updateExperience } =
    useExperienceFormStore();

  const [newExperience, setNewExperience] = useState<ExperienceFormStore[]>([]);

  const handleAddExperience = () => {
    const experienceWithId = { ...formField, id: nanoid() };
    addExperience(experienceWithId);
    setNewExperience([...newExperience, experienceWithId]);
  };

  const handleDelete = () => {
    if (newExperience.length === 0) return;

    const lastExperience = newExperience[newExperience.length - 1];
    removeExperience(lastExperience.id);
    setNewExperience((experiences) =>
      experiences.filter((prev) => prev.id !== lastExperience.id)
    );
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newEntries = newExperience.slice();
    const { name, value } = e.target;

    newEntries[index][name as keyof ExperienceFormStore] = value;
    updateExperience(newEntries[index].id, newEntries[index]);
    setNewExperience(newEntries);
  };

  const handleTextEditor = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    name: string,
    index: number
  ) => {
    const newEntries = newExperience.slice();
    newEntries[index][name as keyof ExperienceFormStore] = e.target.value;
    updateExperience(newEntries[index].id, newEntries[index]);
    setNewExperience(newEntries);
  };

  const handleCheckChange = (
    e: boolean | string,
    name: string,
    index: number
  ) => {
    const newEntries = newExperience.slice();
    console.log(e.toString());
    newEntries[index][name as keyof ExperienceFormStore] = e.toString();
    updateExperience(newEntries[index].id, newEntries[index]);
    setNewExperience(newEntries);
  };

  return (
    <div className="px-5 py-10 h-full   border-t-customDarkBlue border-t-4  rounded-3xl p-6 shadow-xl border  bg-white  shadow-black/[0.4] ">
      <h1 className="text-2xl text-customDarkBlue font-openSans font-semibold">
        Professional Experience
      </h1>
      <p className="text-gray-600 font-openSans font-normal text-sm">
        Add your Job Experience
      </p>
      <div className="border my-3 border-customDarkBlue"></div>
      {newExperience.map((val, index) => (
        <div key={val.id}>
          <div className="flex flex-col"></div>
          <div className="grid grid-cols-2 gap-x-2 mt-3">
            <div>
              <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
                Position Title
              </Label>
              <Input
                placeholder="Full Stack Developer"
                name="position"
                value={val.position}
                onChange={(event) => handleChange(index, event)}
                className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
              />
            </div>
            <div>
              <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
                Company Name
              </Label>
              <Input
                placeholder="Tech Innovators Inc."
                name="company"
                value={val.company}
                onChange={(event) => handleChange(index, event)}
                className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
              />
            </div>

            <div className="col-span-1 mt-4">
              <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
                Location
              </Label>
              <Input
                placeholder="San Francisco, CA"
                name="location"
                value={val.location}
                onChange={(event) => handleChange(index, event)}
                className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
              />
            </div>
            <div className="col-span-1 mt-4">
              <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
                Start Date
              </Label>
              <Input
                name="startDate"
                type="date"
                value={val.startDate}
                onChange={(event) => handleChange(index, event)}
                className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
              />
            </div>
            <div className="col-span-1 mt-4">
              <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
                End Date
              </Label>
              <Input
                disabled={val.isPresent == "true"}
                type="date"
                name="endDate"
                value={val.endDate}
                onChange={(event) => handleChange(index, event)}
                className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
              />
            </div>
            <div className="col-span-1 flex  justify-start px-10 mt-10">
              <div className="flex gap-x-3 items-center">
                <Checkbox
                  name="isPresent"
                  checked={val.isPresent == "true"}
                  value={val.isPresent}
                  onCheckedChange={(event) =>
                    handleCheckChange(event, "isPresent", index)
                  }
                />
                <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
                  Present
                </Label>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <TextEditor
              onTextEditorChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleTextEditor(e, "responsibilities", index)
              }
            />
          </div>
        </div>
      ))}
      <div className="flex justify-start mt-4 gap-x-4">
        <Button
          onClick={handleAddExperience}
          className="bg-blue-800 hover:bg-blue-900 rounded-2xl shadow-sm text-white "
        >
          <Plus /> Add Experience
        </Button>
        <Button
          onClick={handleDelete}
          className="bg-red-700 w-36 hover:bg-red-800 rounded-2xl shadow-sm text-white "
        >
          Delete Experience
        </Button>
      </div>
    </div>
  );
};

export default ExperienceForm;
