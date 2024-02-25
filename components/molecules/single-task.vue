<script lang="ts">
import CButton from "~/components/atoms/c-button.vue";
import CInput from "~/components/atoms/c-input.vue";
import type { ITask } from "~/store";
import { useStore } from "vuex";

export default {
  components: { CButton, CInput },

  props: {
    taskId: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const toggleTask = (id: string) => store.dispatch("toggleTask", id);
    const removeTask = (id: string) => store.dispatch("removeTask", id);
    const editTask = (newTask: ITask) => store.dispatch("editTask", newTask);

    const getStatusText = (status: boolean) => (status ? "done" : "todo");

    const editValue = ref(props.text);
    const isEditing = ref(false);

    const enableEditing = () => {
      isEditing.value = true;
    };

    const disableEditing = () => {
      isEditing.value = false;
    };

    const handleEditConfirmation = () => {
      const normalizedText = editValue.value.trim();
      if (!normalizedText) {
        editValue.value = props.text;
        return;
      }

      editTask({
        id: props.taskId,
        isDone: props.isDone,
        text: normalizedText,
      });

      disableEditing();
    };

    const handleEditCancelation = () => {
      editValue.value = props.text;
      disableEditing();
    };

    return {
      getStatusText,
      toggleTask,
      removeTask,
      editValue,
      handleEditCancelation,
      isEditing,
      enableEditing,
      handleEditConfirmation,
    };
  },
};
</script>

<template>
  <li
    class="overflow-hidden relative p-4 pr-8 rounded-md bg-slate-300 after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-0 after:bg-green-300 after:w-6"
    :class="{
      'opacity-70 after:opacity-100': isDone,
      'after:opacity-0': !isDone,
    }"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1 mb-4">
        <p class="text-sm">Status:</p>
        <c-button
          @click="toggleTask(taskId)"
          :text="getStatusText(isDone)"
          type="button"
          size="small"
        />
      </div>

      <div class="flex items-center gap-1 mb-4">
        <c-button
          @click="enableEditing()"
          text="edit"
          type="button"
          size="small"
        />
        <c-button
          @click="removeTask(taskId)"
          text="remove"
          type="button"
          size="small"
        />
      </div>
    </div>

    <form v-if="isEditing" @submit.prevent="handleEditConfirmation()">
      <c-input v-model="editValue" class="mb-1" required />
      <div class="flex gap-1">
        <c-button text="confirm" size="small" />
        <c-button
          @click="handleEditCancelation()"
          text="cancel"
          type="button"
          size="small"
        />
      </div>
    </form>

    <h3
      v-else
      :class="{
        'line-through': isDone,
      }"
    >
      {{ text }}
    </h3>
  </li>
</template>
