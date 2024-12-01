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
