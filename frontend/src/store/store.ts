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
