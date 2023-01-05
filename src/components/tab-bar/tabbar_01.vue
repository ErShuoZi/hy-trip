<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabbarData">
      <div
        class="tab-bar-item"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index, item)"
      >
        <!-- webpack中 -->
        <!-- <img :src="require(item.image)" alt="" /> -->
        <!-- vite中 -->
        <img
          v-if="currentIndex !== index"
          :src="getAssetUrl(item.image)"
          alt=""
        />
        <img v-else :src="getAssetUrl(item.imageActive)" alt="" />
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { getAssetUrl } from "@/utils/load_assets";
import { ref } from "vue";
import { useRouter } from "vue-router";
defineProps({
  tabbarData: {
    type: Array,
    default: () => [],
  },
});

let currentIndex = ref(Number(window.sessionStorage.getItem("pageNum")) || 0);
const router = useRouter();
const itemClick = (index, item) => {
  currentIndex.value = index;
  window.sessionStorage.setItem("pageNum", index);
  router.push(item.path);
};
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;

  height: 50px;
  border-top: 1px solid #f3f3f3;

  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.active {
      color: var(--primary-color);
    }
    img {
      width: 32px;
    }
    .text {
      font-size: 14px;

      margin-top: 2px;
    }
  }
}
</style>
