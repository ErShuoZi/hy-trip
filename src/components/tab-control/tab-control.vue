<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      @click="itemClick(index)"
      :class="[{ active: index === currentIndex }, 'tab-control-item']"
    >
      <slot :item="item">
        <span> {{ item }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emits = defineEmits(["tabItemclick"]);
const props = defineProps({
  titles: {
    type: Array,
    default: () => [],
  },
});
let currentIndex = ref(0);

const itemClick = (index) => {
  currentIndex.value = index;
  emits("tabItemclick", index);
};
</script>

<style scoped>
.tab-control {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  justify-content: space-around;
}
.active {
  color: var(--primary-color);
  font-weight: 700;
  border-bottom: 3px solid var(--primary-color);
}
</style>
