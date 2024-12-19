import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ProjectsFormState,
  useProjectsFormState,
  useResumeState,
} from "@/store/store";
import React, { useState } from "react";
import TextEditor from "../components/TextEditor";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { v4 as uuid } from "uuid";

const formField: ProjectsFormState = {
  id: "",
  description: "",
  endDate: "",
  startDate: "",
  techStack: "",
  title: "",
};

const ProjectForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { projects, addProjects, removeProjects, updateProjects } =
    useProjectsFormState();

  const resumeAddProject = useResumeState((state) => state.addProject);
  const resumeRemoveProject = useResumeState((state) => state.deleteProject);
  const updateResumeProject = useResumeState((state) => state.updateProject);

  // const [index, setIndex] = useState(0);
  const handleAddProjects = () => {
    // const currentIndex = index + 1;

    const projectWithId = { ...formField, id: uuid() };
    addProjects(projectWithId);
    resumeAddProject(projectWithId);
    // setIndex(currentIndex);
  };

  const handleDelete = () => {
    if (projects.length === 0) return;
    const lastProject = projects[projects.length - 1];
    removeProjects(lastProject.id);
    resumeRemoveProject(lastProject.id);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newEntries = projects.slice();
    const { name, value } = e.target;

    newEntries[index][name as keyof ProjectsFormState] = value;
    updateProjects(newEntries[index].id, newEntries[index]);
    updateResumeProject(newEntries[index].id, newEntries[index]);
  };

  const handleTextEditor = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    name: string,
    index: number
  ) => {
    const newEntries = projects.slice();
    newEntries[index][name as keyof ProjectsFormState] = e.target.value;
    updateProjects(newEntries[index].id, newEntries[index]);
  };

  return (
    <div className="px-5 py-10 h-full   border-t-customDarkBlue border-t-4  rounded-3xl p-6 shadow-xl border  bg-white  shadow-black/[0.4] ">
      <h1 className="text-2xl text-customDarkBlue font-openSans font-semibold">
        Project Details
      </h1>
      <p className="text-gray-600 font-openSans font-normal text-sm">
        Add your Personal Projects
      </p>
      <div className="border my-3 border-customDarkBlue"></div>
      {projects.map((val, index) => (
        <div
          key={val.id}
          className="mt-5 border border-customDarkBlue p-5 shadow-lg rounded-xl"
        >
          <div className="flex flex-col"></div>
          <div className="grid grid-cols-2 gap-x-2 mt-3">
            <div>
              <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
                Project Title
              </Label>
              <Input
                placeholder="Eg. E-commerce Application"
                name="title"
                value={val.title}
                onChange={(event) => handleChange(index, event)}
                className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
              />
            </div>
            <div>
              <Label className="text-sm text-customDarkBlue font-openSans font-semibold">
                Tech Stack
              </Label>
              <Input
                placeholder="Eg. React.js, Next.js"
                name="techStack"
                value={val.techStack}
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
                type="date"
                name="endDate"
                value={val.endDate}
                onChange={(event) => handleChange(index, event)}
                className="mt-1 border-customDarkBlue focus:border-2 focus-visible:ring-transparent"
              />
            </div>
          </div>
          <div className="mt-4">
            <TextEditor
              saveValue={val.description}
              index={index}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              onTextEditorChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleTextEditor(e, "description", index)
              }
            />
          </div>
        </div>
      ))}
      <div className="flex justify-start mt-4 gap-x-4">
        <Button
          onClick={handleAddProjects}
          className="bg-blue-800 hover:bg-blue-900 rounded-2xl shadow-sm text-white "
        >
          <Plus /> Add Project
        </Button>
        <Button
          onClick={handleDelete}
          className="bg-red-700 w-36 hover:bg-red-800 rounded-2xl shadow-sm text-white "
        >
          Delete Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectForm;
