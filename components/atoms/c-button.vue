<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

type Size = "small" | "medium";

export default defineComponent({
  props: {
    text: {
      type: String as PropType<string>,
      required: true,
    },
    size: {
      type: String as PropType<Size>,
      required: false,
      default: "medium",
    },
  },
});
</script>

<template>
  <button
    class="overflow-hidden text-sm font-bold rounded-md touch-manipulation bg-slate-200 after:bg-slate-400 active:opacity-50 relative isolate after:content-[''] after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 after:-z-10 after:opacity-0 hover:after:opacity-100"
    :class="{
      'px-4 py-2': size === 'medium',
      'px-2': size === 'small',
    }"
  >
    {{ text }}
  </button>
</template>
