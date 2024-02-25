<script lang="ts">
import CButton from "~/components/atoms/c-button.vue";
import CInput from "~/components/atoms/c-input.vue";
import { useStore } from "vuex";

export default {
  components: { CButton, CInput },

  setup() {
    const inputVal = ref("");

    const store = useStore();
    const handleSubmit = () => {
      store.dispatch("addTask", inputVal.value);

      inputVal.value = "";
    };

    return {
      inputVal,
      handleSubmit,
    };
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
    <c-input v-model="inputVal" placeholder="Add new task" required />
    <c-button text="Add task" />
  </form>
</template>
