<script lang="ts">
import TasksList from "~/components/organisms/tasks-list.vue";
import TasksFilter from "~/components/organisms/tasks-filter.vue";
import TaskForm from "~/components/organisms/task-form.vue";
import TasksImportExport from "~/components/organisms/tasks-import-export.vue";

export default {
  components: { TasksList, TaskForm, TasksImportExport, TasksFilter },
};
</script>

<template>
  <div class="min-h-screen p-10 bg-gray-900">
    <div class="flex flex-col max-w-xl gap-6 mx-auto my-0 lg:gap-8">
      <h1 class="text-4xl font-bold text-white lg:mb-6 lg:text-6xl">
        TODO List App
      </h1>
      <task-form />
      <tasks-import-export />
      <tasks-filter />
      <tasks-list />
    </div>
  </div>
</template>
