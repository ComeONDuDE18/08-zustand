
import { create } from "zustand";
import type { NewNoteData } from "@/types/note";

const initialDraft: NewNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: Partial<NewNoteData>) => void; // <-- Partial тут!
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>((set) => ({
  draft: initialDraft,
  setDraft: (note) =>
    set((state) => ({
      draft: { ...state.draft, ...note }, // <-- зливає часткові дані
    })),
  clearDraft: () => set({ draft: initialDraft }),
}));
