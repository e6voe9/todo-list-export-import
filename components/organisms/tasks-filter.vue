<script lang="ts">
import CButton from "~/components/atoms/c-button.vue";
import CInput from "~/components/atoms/c-input.vue";
import CHeading from "~/components/atoms/c-heading.vue";
import { useStore } from "vuex";

export default {
  components: { CButton, CInput, CHeading },

  setup() {
    const inputVal = ref("");

    const store = useStore();

    watch(inputVal, () => {
      store.dispatch("setFilter", inputVal.value);
    });

    return {
      inputVal,
    };
  },
};
</script>

<template>
  <c-heading text="Filter:" />
  <c-input v-model="inputVal" placeholder="Enter filter keyword" />
</template>
