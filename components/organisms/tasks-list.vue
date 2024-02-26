<script lang="ts">
import SingleTask from "~/components/molecules/single-task.vue";
import CHeading from "~/components/atoms/c-heading.vue";
import { setTasksToLS, getTasksFromLS } from "~/utils/tasks-local-storage";
import type { ITask } from "~/store";
import { useStore } from "vuex";

export default {
  components: { SingleTask, CHeading },
  setup() {
    const store = useStore();
    const allTasks = computed(() => store.getters.allTasks);
    const filterValue = computed(() => store.getters.getFilterValue);

    const filteredTasks = computed(() => {
      const filter = filterValue.value.trim();
      if (!filter) return allTasks.value;

      return allTasks.value.filter((task: ITask) =>
        task.text.toLowerCase().includes(filter.toLowerCase())
      );
    });

    return {
      filteredTasks,
    };
  },
  beforeUpdate() {
    const store = useStore();
    const allTasks = computed(() => store.getters.allTasks);
    setTasksToLS(allTasks.value);
  },
  mounted() {
    const store = useStore();
    const setTasks = () => store.dispatch("setTasks", getTasksFromLS());
    setTasks();
  },
};
</script>

<template>
  <c-heading text="Tasks:" />
  <ul v-if="filteredTasks.length" class="flex flex-col gap-3">
    <single-task
      v-for="item in filteredTasks"
      :key="item.id"
      :task-id="item.id"
      :text="item.text"
      :is-done="item.isDone"
    />
  </ul>
  <p v-else class="text-sm text-white">Please add your first task.</p>
</template>
