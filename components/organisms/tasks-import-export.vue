<script lang="ts">
import CButton from "~/components/atoms/c-button.vue";
import type { ITask } from "~/store";
import { useFileOperations } from "~/composables/useFileOperations";
import { useStore } from "vuex";

export default {
  components: { CButton },

  setup() {
    const { downloadTxtFile, importTxtFile } = useFileOperations();

    const store = useStore();
    const setTasks = (tasks: ITask[]) => store.dispatch("setTasks", tasks);
    const allTasks = computed(() => store.getters.allTasks);

    const download = () => {
      downloadTxtFile(allTasks.value);
    };

    const importFile = async () => {
      const importedArray: ITask[] = await importTxtFile();
      setTasks(importedArray);
    };

    return { download, importFile };
  },
};
</script>

<template>
  <div class="flex gap-2 ml-auto">
    <c-button @click="download" text="Export to txt" type="button" />
    <c-button @click="importFile" text="Import from txt" type="button" />
  </div>
</template>
