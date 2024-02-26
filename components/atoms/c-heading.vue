<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  props: {
    text: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>

<template>
  <h2 class="text-2xl font-bold text-white lg:text-4xl">{{ text }}</h2>
</template>
