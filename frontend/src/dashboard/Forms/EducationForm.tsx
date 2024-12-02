import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EducationFormState, useEducationState } from "@/store/store";
import React from "react";

const EducationForm = () => {
  const { educationDetails, addEducation, removeEducation, updateEducation } =
    useEducationState();

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newEntries = educationDetails.slice();
    const { name, value } = e.target;

    newEntries[index][name as keyof EducationFormState] = value;
    updateEducation(newEntries[index].id, newEntries[index]);
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
        <div className="grid grid-cols-2 gap-x-2 mt-3">
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
              placeholder="+1 123-456-7890"
              name="graduationYear"
              value={val.graduationYear}
              onChange={(event) => handleChange(index, event)}
              className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
            />
          </div>
          <div className="col-span-1 mt-4">
            <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
              E-Mail
            </Label>
            <Input
              placeholder="john.doe@example.com"
              name="location"
              value={val.location}
              onChange={(event) => handleChange(index, event)}
              className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
            />
          </div>
        </div>
      ))}

      <div className="mt-4 flex justify-end">
        <Button className="bg-blue-800 hover:bg-blue-900 p-x-2 w-36">
          Save Data
        </Button>
      </div>
    </div>
  );
};

export default EducationForm;
