import React, { useState } from "react";
import TextEditor from "../components/TextEditor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useExperienceFormStore } from "@/store/store";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ExperienceForm = () => {
  const { experiences, addExperience } = useExperienceFormStore();

  const [newExperience, setNewExperience] = useState({
    id: "",
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
    location: "",
  });

  const handleAddExperience = () => {
    const experienceWithId = { ...newExperience, id: nanoid() };
    addExperience(experienceWithId);
    setNewExperience({
      id: "",
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
      location: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1 className="text-2xl text-customDarkBlue font-openSans font-semibold">
        Professional Experience
      </h1>
      <p className="text-gray-600 font-openSans font-normal text-sm">
        Add your Job Experience
      </p>
      <div className="border my-3 border-customDarkBlue"></div>
      {experiences.map((val, index) => (
        <div key={index}>
          <div className="flex flex-col"></div>
          <div className="grid grid-cols-2 gap-x-2 mt-3">
            <div>
              <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
                Position Title
              </Label>
              <Input
                placeholder="Full Stack Developer"
                name="position"
                value={newExperience.position}
                onChange={handleChange}
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
                value={newExperience.company}
                onChange={handleChange}
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
                value={newExperience.location}
                onChange={handleChange}
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
                value={newExperience.startDate}
                onChange={handleChange}
                className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
              />
            </div>
            <div className="col-span-1 mt-4">
              <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
                End Date
              </Label>
              <Input
                type="date"
                name="endDate"
                value={newExperience.endDate}
                onChange={handleChange}
                className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
              />
            </div>
          </div>
          <div className="mt-4">
            <TextEditor />
          </div>
        </div>
      ))}
      <div className="flex justify-start mt-4 ">
        <Button
          onClick={handleAddExperience}
          className="bg-blue-800 hover:bg-blue-900 rounded-2xl shadow-sm text-white "
        >
          <Plus /> Add Experience
        </Button>
      </div>
    </div>
  );
};

export default ExperienceForm;
