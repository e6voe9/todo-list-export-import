import { v4 as uuidv4 } from "uuid"
import { createStore, ActionContext } from 'vuex'

export interface ITask {
  id: string;
  text: string;
  isDone: boolean;
}

interface IState {
  tasks: ITask[],
  filterValue: string,
}

const mutations = {
  SET_TASKS(state: IState, tasks: ITask[]) {
    state.tasks = tasks
  },
  ADD_TASK(state: IState, taskText: string) {
    const task = {
      isDone: false,
      text: taskText,
      id: uuidv4()
    }

    state.tasks.unshift(task)
  },
  REMOVE_TASK(state: IState, taskId: string) {
    state.tasks = state.tasks.filter((task: ITask) => task.id !== taskId)
  },
  TOGGLE_TASK(state: IState, taskId: string) {
    const id = state.tasks.findIndex((task: ITask) => task.id === taskId)
    state.tasks[id].isDone = !state.tasks[id].isDone
  },
  EDIT_TASK(state: IState, newTask: ITask) {
    const id = state.tasks.findIndex((t: ITask) => t.id === newTask.id)
    state.tasks[id].text = newTask.text
  },
  SET_FILTER(state: IState, newValue: string) {
    state.filterValue = newValue
  }
};

const actions = {
  setTasks({commit}: ActionContext<IState, IState>, tasks: ITask[]) {
    commit("SET_TASKS", tasks)
  },
  addTask({commit}: ActionContext<IState, IState>, text: string) {
    const normalizedText = text.trim()
    if (!normalizedText) return;

    commit("ADD_TASK", normalizedText)
  },
  removeTask({commit}: ActionContext<IState, IState>, id: string) {
    commit("REMOVE_TASK", id)
  },
  toggleTask({commit}: ActionContext<IState, IState>, id: string) {
    commit("TOGGLE_TASK", id)
  },
  editTask({commit}: ActionContext<IState, IState>, task: ITask) {
    commit("EDIT_TASK", task);
  },
  setFilter({commit}: ActionContext<IState, IState>, newValue: string) {
    commit("SET_FILTER", newValue);
  }
}

const getters = {
  allTasks: (state: IState): ITask[] => state.tasks,
  getFilterValue: (state: IState): string => state.filterValue
}

const store = createStore<IState>({
  state: {
    tasks: [],
    filterValue: "",
  },
  mutations,
  actions,
  getters
})

export default store;
