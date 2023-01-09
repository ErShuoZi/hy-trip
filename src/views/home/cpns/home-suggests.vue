<template>
  <div class="home-suggests"></div>
</template>

<script setup>
const props = defineProps({
  hotSuggests: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
