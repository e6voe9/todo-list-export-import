<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <h2 class="text-2xl font-bold text-white lg:text-4xl">{{ text }}</h2>
</template>
