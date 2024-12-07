import { create } from "zustand";

type formStoreType = {
  formIndex: number;
};

type Action = {
  updateState: (index: formStoreType["formIndex"]) => void;
};

export const useFormStore = create<formStoreType & Action>((set) => ({
  formIndex: 1,
  updateState: (index) => set({ formIndex: index }),
}));

export type PersonalFormType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  updateField: (
    field: keyof Omit<PersonalFormType, "updateField">,
    value: string
  ) => void;
};

export const usePersonalFormStore = create<PersonalFormType>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  portfolio: "",

  updateField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
}));

export type ExperienceFormStore = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  isPresent: string;
};

export type ExperienceState = {
  experiences: ExperienceFormStore[];
  addExperience: (experience: ExperienceFormStore) => void;
  updateExperience: (id: string, experience: ExperienceFormStore) => void;
  removeExperience: (id: string) => void;
};

export const useExperienceFormStore = create<ExperienceState>((set) => ({
  experiences: [],

  addExperience: (experience) =>
    set((state) => ({
      experiences: [...state.experiences, experience],
    })),

  updateExperience: (id, updatedExperience) =>
    set((state) => ({
      experiences: state.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updatedExperience } : exp
      ),
    })),

  removeExperience: (id) =>
    set((state) => ({
      experiences: state.experiences.filter((exp) => exp.id !== id),
    })),
}));

export type EducationFormState = {
  id: string;
  institution: string;
  degree: string;
  graduationYear: string;
  location: string;
};

export type EducationState = {
  educationDetails: EducationFormState[];
  addEducation: (educationDetails: EducationFormState) => void;
  updateEducation: (id: string, educationDetails: EducationFormState) => void;
  removeEducation: (id: string) => void;
};

export const useEducationState = create<EducationState>((set) => ({
  educationDetails: [],

  addEducation: (education) =>
    set((state) => ({
      educationDetails: [...state.educationDetails, education],
    })),

  updateEducation: (id, updateEducation) =>
    set((state) => ({
      educationDetails: state.educationDetails.map((exp) =>
        exp.id === id ? { ...exp, ...updateEducation } : exp
      ),
    })),

  removeEducation: (id) =>
    set((state) => ({
      educationDetails: state.educationDetails.filter((exp) => exp.id !== id),
    })),
}));

export type SkillsFormType = {
  languages: string[];
  frameworks: string[];
  developerTools: string[];

  addLanguages: (language: string) => void;
  addFrameworks: (framework: string) => void;
  addDeveloperTools: (developerTool: string) => void;

  removeLanguages: (language: string) => void;
  removeFrameworks: (framework: string) => void;
  removeDeveloperTools: (developerTool: string) => void;
};

export const useSkillsFormState = create<SkillsFormType>((set) => ({
  // State
  languages: [],
  frameworks: [],
  developerTools: [],

  // Add methods
  addLanguages: (language) =>
    set((state) => ({
      languages: [...state.languages, language],
    })),
  addFrameworks: (framework) =>
    set((state) => ({
      frameworks: [...state.frameworks, framework],
    })),
  addDeveloperTools: (developerTool) =>
    set((state) => ({
      developerTools: [...state.developerTools, developerTool],
    })),

  // Remove methods
  removeLanguages: (language) =>
    set((state) => ({
      languages: state.languages.filter((lang) => lang !== language),
    })),
  removeFrameworks: (framework) =>
    set((state) => ({
      frameworks: state.frameworks.filter((fw) => fw !== framework),
    })),
  removeDeveloperTools: (developerTool) =>
    set((state) => ({
      developerTools: state.developerTools.filter(
        (tool) => tool !== developerTool
      ),
    })),
}));

// Personal Projects

export type ProjectsFormState = {
  id: string;
  title: string;
  description: string;
  techStack: string;
  startDate: string;
  endDate: string;
};

export type ProjectsState = {
  projects: ProjectsFormState[];
  addProjects: (project: ProjectsFormState) => void;
  updateProjects: (id: string, project: ProjectsFormState) => void;
  removeProjects: (id: string) => void;
};

export const useProjectsFormState = create<ProjectsState>((set) => ({
  projects: [],

  addProjects: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  updateProjects: (id, updateProject) =>
    set((state) => ({
      projects: state.projects.map((exp) =>
        exp.id === id ? { ...exp, ...updateProject } : exp
      ),
    })),

  removeProjects: (id) =>
    set((state) => ({
      projects: state.projects.filter((exp) => exp.id !== id),
    })),
}));

export type SectionState = {
  sectionsOrder: string[];
  updateSectionOrder: (newOrder: string[]) => void;
};

export const useSectionStore = create<SectionState>((set) => ({
  sectionsOrder: ["Education", "Experience", "Projects", "Skills"],
  updateSectionOrder: (newOrder: string[]) =>
    set(() => ({
      sectionsOrder: newOrder,
    })),
}));

type Skills = {
  languages: string[];
  frameworks: string[];
  developerTools: string[];
};

// Resume Type
type ResumeState = {
  personal: Omit<PersonalFormType, "updateField">;
  education: EducationFormState[];
  experience: ExperienceFormStore[];
  skills: Skills;
  projects: ProjectsFormState[];

  setPersonal: (personal: Omit<PersonalFormType, "updateField">) => void;

  addEducation: (education: EducationFormState) => void;
  updateEducation: (id: string, updatedEducation: EducationFormState) => void;
  deleteEducation: (id: string) => void;

  addExperience: (experience: ExperienceFormStore) => void;
  updateExperience: (
    id: string,
    updatedExperience: ExperienceFormStore
  ) => void;
  deleteExperience: (id: string) => void;

  setSkills: (skills: Skills) => void;

  addProject: (project: ProjectsFormState) => void;
  updateProject: (id: string, updatedProject: ProjectsFormState) => void;
  deleteProject: (id: string) => void;
};

export const useResumeState = create<ResumeState>((set) => ({
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
  },
  education: [],
  experience: [],
  skills: {
    languages: [],
    frameworks: [],
    developerTools: [],
  },

  projects: [],

  setPersonal: (personal) => set(() => ({ personal })),
  addEducation: (education) =>
    set((state) => ({ education: [...state.education, education] })),
  updateEducation: (id, updatedEducation) =>
    set((state) => ({
      education: state.education.map((edu) =>
        edu.id === id ? { ...edu, ...updatedEducation } : edu
      ),
    })),
  deleteEducation: (id) =>
    set((state) => ({
      education: state.education.filter((edu) => edu.id !== id),
    })),

  addExperience: (experience) =>
    set((state) => ({ experience: [...state.experience, experience] })),
  updateExperience: (id, updatedExperience) =>
    set((state) => ({
      experience: state.experience.map((exp) =>
        exp.id === id ? { ...exp, ...updatedExperience } : exp
      ),
    })),
  deleteExperience: (id) =>
    set((state) => ({
      experience: state.experience.filter((exp) => exp.id !== id),
    })),

  setSkills: (skills) => set(() => ({ skills })),

  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (id, updatedProject) =>
    set((state) => ({
      projects: state.projects.map((proj) =>
        proj.id === id ? { ...proj, ...updatedProject } : proj
      ),
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((proj) => proj.id !== id),
    })),
}));
