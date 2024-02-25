import type { ITask } from "~/store"
const LS_KEY = "tasks"

export const getTasksFromLS = (): ITask[] => {
  const lsData = window.localStorage.getItem(LS_KEY);

  if (!lsData) return [];

  return JSON.parse(lsData);
}

export const setTasksToLS = (tasks: ITask[]): void => {
  window.localStorage.setItem(LS_KEY, JSON.stringify(tasks));
}