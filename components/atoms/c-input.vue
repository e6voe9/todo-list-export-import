<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: false,
    },
    modelValue: {},
  },
  setup(props) {
    return {};
  },
};
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
