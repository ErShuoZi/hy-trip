<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
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
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const props = defineProps({
  tabbarData: {
    type: Array,
    default: () => [],
  },
});

const route = useRoute();
const currentIndex = ref(0);
watch(route, (newRoute) => {
  const index = props.tabbarData.findIndex((item) => item.path === newRoute.path);
  if (index === -1) return;
  currentIndex.value = index;
});
</script>

<style lang="scss" scoped>
.tab-bar {
  img {
    height: 30px;
  }
}
</style>
