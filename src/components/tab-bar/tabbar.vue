<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item @click="itemClick(index, item)" icon="home-o">
          <span>{{ item.text }}</span>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetUrl(item.image)" />
            <img v-else :src="getAssetUrl(item.imageActive)" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
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
  img {
    height: 30px;
  }
}
</style>
