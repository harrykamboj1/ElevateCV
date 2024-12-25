import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EducationFormState,
  useDataSaveType,
  useEducationState,
  useResumeState,
} from "@/store/store";
import { Plus } from "lucide-react";
import { v4 as uuid } from "uuid";

import React from "react";

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
  // const [index, setIndex] = useState(0);
  const setIsDataSave = useDataSaveType((state) => state.setIsDataSave);

  const resumeAddEducation = useResumeState((state) => state.addEducation);

  const resumeRemoveEducation = useResumeState(
    (state) => state.deleteEducation
  );
  const updateResumeEducation = useResumeState(
    (state) => state.updateEducation
  );

  const handleAddExperience = () => {
    // const currentIndex = index + 1;

    const educationWithId = { ...formField, id: uuid() };
    addEducation(educationWithId);
    resumeAddEducation(educationWithId);
    setIsDataSave(false);
    // setIndex(currentIndex);
  };

  const handleDelete = () => {
    if (educationDetails.length === 0) return;

    const lastEducation = educationDetails[educationDetails.length - 1];
    removeEducation(lastEducation.id);
    resumeRemoveEducation(lastEducation.id);
    setIsDataSave(false);
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
    setIsDataSave(false);
  };
  return (
    <div className="px-5 py-10 h-full   border-2 border-zinc-500  rounded-xl p-6 shadow-xl      bg-customDarkGrey">
      <div className="flex flex-col">
        <h1 className="text-2xl text-red-600 font-openSans font-semibold">
          Education Details
        </h1>
        <p className="text-white font-openSans font-normal text-sm">
          Fill your Education details
        </p>
        <div className="border my-3 border-zinc-500"></div>
      </div>
      {educationDetails.map((val, index) => (
        <div className="grid grid-cols-2 gap-x-2 mt-5 border border-zinc-500 p-5 shadow-lg rounded-xl">
          <div>
            <Label className="text-sm text-red-600 font-openSans font-semibold">
              Institution Name
            </Label>
            <Input
              placeholder="John"
              name="institution"
              value={val.institution}
              autoComplete="off"
              onChange={(event) => handleChange(index, event)}
              className="mt-1  border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
            />
          </div>
          <div>
            <Label className="text-sm text-red-600 font-openSans font-semibold">
              Degree
            </Label>
            <Input
              placeholder="Bachelor of Science in Computer Science"
              name="degree"
              value={val.degree}
              autoComplete="off"
              onChange={(event) => handleChange(index, event)}
              className="mt-1  border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
            />
          </div>

          <div className="col-span-1 mt-4">
            <Label className="text-sm text-red-600 font-openSans font-semibold">
              Graduation Year
            </Label>
            <Input
              placeholder="Eg. 2018"
              name="graduationYear"
              value={val.graduationYear}
              autoComplete="off"
              onChange={(event) => handleChange(index, event)}
              className="mt-1  border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
            />
          </div>
          <div className="col-span-1 mt-4">
            <Label className="text-sm text-red-600 font-openSans font-semibold">
              Location
            </Label>
            <Input
              placeholder="Eg. Berkeley, CA"
              name="location"
              value={val.location}
              autoComplete="off"
              onChange={(event) => handleChange(index, event)}
              className="mt-1  border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-start mt-4 gap-x-4">
        <Button
          onClick={handleAddExperience}
          className="flex items-center bg-blue-800 hover:bg-blue-900 rounded-lg px-8 py-2.5  font-dmSans text-white "
        >
          <Plus /> Add Education
        </Button>
        <Button
          onClick={handleDelete}
          className="flex items-center font-dmSans  rounded-lg px-8 py-2.5 border-2 border-red-600 bg-red-600 "
        >
          Delete Education
        </Button>
      </div>
    </div>
  );
};

export default EducationForm;
