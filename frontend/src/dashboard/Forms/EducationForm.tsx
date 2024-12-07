import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EducationFormState,
  useEducationState,
  useResumeState,
} from "@/store/store";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const formField: EducationFormState = {
  id: "",
  institution: "",
  degree: "",
  graduationYear: "",
  location: "",
};

const EducationForm = () => {
  const { educationDetails, addEducation, removeEducation, updateEducation } =
    useEducationState();
  const [index, setIndex] = useState(0);
  const resumeAddEducation = useResumeState((state) => state.addEducation);
  const resumeRemoveEducation = useResumeState(
    (state) => state.deleteEducation
  );
  const updateResumeEducation = useResumeState(
    (state) => state.updateEducation
  );

  const handleAddExperience = () => {
    const currentIndex = index + 1;

    const educationWithId = { ...formField, id: currentIndex.toString() };
    addEducation(educationWithId);
    resumeAddEducation(educationWithId);
    setIndex(currentIndex);
  };

  const handleDelete = () => {
    if (educationDetails.length === 0) return;

    const lastEducation = educationDetails[educationDetails.length - 1];
    removeEducation(lastEducation.id);
    resumeRemoveEducation(lastEducation.id);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newEntries = educationDetails.slice();
    const { name, value } = e.target;

    newEntries[index][name as keyof EducationFormState] = value;
    updateEducation(newEntries[index].id, newEntries[index]);
    updateResumeEducation(newEntries[index].id, newEntries[index]);
  };
  return (
    <div className="px-5 py-10 h-full   border-t-customDarkBlue border-t-4  rounded-3xl p-6 shadow-xl border  bg-white  shadow-black/[0.4]">
      <div className="flex flex-col">
        <h1 className="text-2xl text-customDarkBlue font-openSans font-semibold">
          Education Details
        </h1>
        <p className="text-gray-600 font-openSans font-normal text-sm">
          Fill your Education details
        </p>
        <div className="border my-3 border-customDarkBlue"></div>
      </div>
      {educationDetails.map((val, index) => (
        <div className="grid grid-cols-2 gap-x-2 mt-5 border border-customDarkBlue p-5 shadow-lg rounded-xl">
          <div>
            <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
              Institution Name
            </Label>
            <Input
              placeholder="John"
              name="institution"
              value={val.institution}
              onChange={(event) => handleChange(index, event)}
              className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
            />
          </div>
          <div>
            <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
              Degree
            </Label>
            <Input
              placeholder="Bachelor of Science in Computer Science"
              name="degree"
              value={val.degree}
              onChange={(event) => handleChange(index, event)}
              className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
            />
          </div>

          <div className="col-span-1 mt-4">
            <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
              Graduation Year
            </Label>
            <Input
              placeholder="Eg. 2018"
              name="graduationYear"
              value={val.graduationYear}
              onChange={(event) => handleChange(index, event)}
              className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
            />
          </div>
          <div className="col-span-1 mt-4">
            <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
              Location
            </Label>
            <Input
              placeholder="Eg. Berkeley, CA"
              name="location"
              value={val.location}
              onChange={(event) => handleChange(index, event)}
              className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-start mt-4 gap-x-4">
        <Button
          onClick={handleAddExperience}
          className="bg-blue-800 hover:bg-blue-900 rounded-2xl shadow-sm text-white "
        >
          <Plus /> Add Education
        </Button>
        <Button
          onClick={handleDelete}
          className="bg-red-700 w-36 hover:bg-red-800 rounded-2xl shadow-sm text-white "
        >
          Delete Education
        </Button>
      </div>
    </div>
  );
};

export default EducationForm;
