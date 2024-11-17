import { create } from "zustand";

type formStoreType = {
  formIndex: number;
};

type Action = {
  updateState: (index: formStoreType["formIndex"]) => void;
};

const useFormStore = create<formStoreType & Action>((set) => ({
  formIndex: 1,
  updateState: () => set((state) => ({ formIndex: state.formIndex })),
}));

export default useFormStore;
