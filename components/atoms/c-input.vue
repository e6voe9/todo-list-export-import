<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String as PropType<string>,
      required: false,
    },
    modelValue: {},
  },
});
</script>

<template>
  <label class="flex flex-col w-full gap-3">
    <span v-if="label" class="text-lg text-white">{{ label }}</span>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      class="px-4 py-2 text-sm rounded-md touch-manipulation bg-slate-200"
      v-bind="$attrs"
    />
  </label>
</template>
