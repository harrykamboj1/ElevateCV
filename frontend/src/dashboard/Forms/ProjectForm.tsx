import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ProjectsFormState,
  useDataSaveType,
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

  const setIsDataSave = useDataSaveType((state) => state.setIsDataSave);
  const resumeAddProject = useResumeState((state) => state.addProject);
  const resumeRemoveProject = useResumeState((state) => state.deleteProject);
  const updateResumeProject = useResumeState((state) => state.updateProject);

  // const [index, setIndex] = useState(0);
  const handleAddProjects = () => {
    // const currentIndex = index + 1;

    const projectWithId = { ...formField, id: uuid() };
    addProjects(projectWithId);
    resumeAddProject(projectWithId);
    setIsDataSave(false);
    // setIndex(currentIndex);
  };

  const handleDelete = () => {
    if (projects.length === 0) return;
    const lastProject = projects[projects.length - 1];
    removeProjects(lastProject.id);
    resumeRemoveProject(lastProject.id);
    setIsDataSave(false);
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
    setIsDataSave(false);
  };

  const handleTextEditor = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    name: string,
    index: number
  ) => {
    const newEntries = projects.slice();
    newEntries[index][name as keyof ProjectsFormState] = e.target.value;
    updateProjects(newEntries[index].id, newEntries[index]);
    updateResumeProject(newEntries[index].id, newEntries[index]);
    setIsDataSave(false);
  };

  return (
    <div className="px-5 py-10 h-full    border-2 border-zinc-500  rounded-xl p-6 shadow-xl      bg-customDarkGrey ">
      <h1 className="text-2xl text-red-600 font-dmSans font-semibold">
        Project Details
      </h1>
      <p className="text-white font-dmSans font-normal text-sm">
        Add your Personal Projects
      </p>
      <div className="border my-3 border-zinc-500"></div>
      {projects.map((val, index) => (
        <div
          key={val.id}
          className="mt-5 border border-zinc-500 p-5 shadow-lg rounded-xl"
        >
          <div className="flex flex-col"></div>
          <div className="grid grid-cols-2 gap-x-2 mt-3">
            <div>
              <Label className="text-sm text-red-600 font-dmSans font-semibold">
                Project Title
              </Label>
              <Input
                placeholder="Eg. E-commerce Application"
                name="title"
                value={val.title}
                autoComplete="off"
                onChange={(event) => handleChange(index, event)}
                className="mt-1 border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
              />
            </div>
            <div>
              <Label className="text-sm text-red-600 font-dmSans font-semibold">
                Tech Stack
              </Label>
              <Input
                placeholder="Eg. React.js, Next.js"
                name="techStack"
                value={val.techStack}
                autoComplete="off"
                onChange={(event) => handleChange(index, event)}
                className="mt-1 border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
              />
            </div>

            <div className="col-span-1 mt-4">
              <Label className="text-sm text-red-600 font-dmSans font-semibold">
                Start Date
              </Label>
              <Input
                name="startDate"
                type="date"
                value={val.startDate}
                autoComplete="off"
                onChange={(event) => handleChange(index, event)}
                className="mt-1 border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
                style={{
                  colorScheme: "dark",
                }}
              />
            </div>
            <div className="col-span-1 mt-4">
              <Label className="text-sm text-red-600 font-dmSans font-semibold">
                End Date
              </Label>
              <Input
                type="date"
                name="endDate"
                value={val.endDate}
                autoComplete="off"
                onChange={(event) => handleChange(index, event)}
                className="mt-1 border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
                style={{
                  colorScheme: "dark",
                }}
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
          className="flex items-center bg-blue-800 hover:bg-blue-900 rounded-lg px-8 py-2.5  font-dmSans text-white"
        >
          <Plus /> Add Project
        </Button>
        <Button
          onClick={handleDelete}
          className="flex items-center font-dmSans  rounded-lg px-8 py-2.5 border-2 border-red-600 bg-red-600 "
        >
          Delete Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectForm;
