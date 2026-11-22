import { create } from "zustand";
import type { TaskStatus } from "@/types/task";

type TaskFilter = "all" | TaskStatus;
interface TaskUIState {
  isFormOpen: boolean;
  editingTaskId: string | null;
  filter: TaskFilter;
  search: string;
  openCreate: () => void;
  openEdit: (id: string) => void;
  closeForm: () => void;
  setFilter: (filter: TaskFilter) => void;
  setSearch: (search: string) => void;
}

export const useTaskUI = create<TaskUIState>((set) => ({
  isFormOpen: false,
  editingTaskId: null,
  filter: "all",
  search: "",
  openCreate: () => set({ isFormOpen: true, editingTaskId: null }),
  openEdit: (id) => set({ isFormOpen: true, editingTaskId: id }),
  closeForm: () => set({ isFormOpen: false, editingTaskId: null }),
  setFilter: (filter) => set({ filter }),
  setSearch: (search) => set({ search }),
}));
